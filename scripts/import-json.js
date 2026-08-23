/*
  import-json.js
  - Reads data/products.json and writes into the Prisma-managed SQLite database.
  Usage:
    1. Set DATABASE_URL="file:./data/database.db"
    2. Run migrations: npx prisma migrate dev --name init
    3. Run: node scripts/import-json.js
*/

const fs = require('fs');
const path = require('path');

async function main() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const dataPath = path.join(process.cwd(), 'data', 'products.json');
  if (!fs.existsSync(dataPath)) {
    console.error('data/products.json not found');
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  if (!Array.isArray(products)) {
    console.error('products.json must be an array');
    process.exit(1);
  }

  console.log(`Importing ${products.length} products...`);

  // Simple approach: delete existing and recreate
  await prisma.product.deleteMany();

  const mapped = products.map(p => ({
    id: p.id,
    brand: p.brand,
    model: p.model,
    image: p.image || null,
    customerPrice: Number(p.customerPrice) || 0,
    dealerPrice: Number(p.dealerPrice) || 0,
    deposit: Number(p.deposit) || 0,
    dailyPayment: Number(p.dailyPayment) || 0,
    margin: Number(p.margin) || 0,
    referralCommission: Number(p.referralCommission) || 0,
    availability: p.availability || null,
    specs: p.specs || null,
  }));

  for (const p of mapped) {
    await prisma.product.create({ data: p });
  }

  console.log('Import complete.');
  await prisma.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
