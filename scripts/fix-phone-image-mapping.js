#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const productsPath = path.join(root, 'data', 'products.json');
const imagesDir = path.join(root, 'public', 'phone-images');

const files = fs.existsSync(imagesDir)
  ? fs.readdirSync(imagesDir).filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file))
  : [];

const norm = (value) => String(value ?? '')
  .toUpperCase()
  .replace(/\.[^.]+$/, '')
  .replace(/[_~+()\[\]{}]/g, ' ')
  .replace(/[^A-Z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const toTokens = (value) => [...new Set(norm(value).split(' ').filter(Boolean))];

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
let changed = 0;
let unresolved = 0;

for (const product of products) {
  const requested = norm(product.model);
  const requestedTokens = toTokens(product.model);
  const brandTokens = toTokens(product.brand);

  let bestMatch = null;
  let bestScore = -1;

  for (const file of files) {
    const fileName = norm(file);
    const fileTokens = toTokens(file);

    if (fileName === requested) {
      bestMatch = file;
      bestScore = Number.MAX_SAFE_INTEGER;
      break;
    }

    const tokenOverlap = requestedTokens.filter((token) => fileTokens.includes(token)).length;
    const brandOverlap = brandTokens.filter((token) => fileTokens.includes(token)).length;
    const prefixBonus = requested.includes(fileName.slice(0, 12)) || fileName.includes(requested.slice(0, 12)) ? 2 : 0;
    const score = tokenOverlap * 10 + brandOverlap * 4 + prefixBonus;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = file;
    }
  }

  if (bestMatch) {
    const resolved = `/phone-images/${bestMatch}`;
    if (product.image !== resolved) {
      product.image = resolved;
      changed += 1;
    }
  } else {
    unresolved += 1;
  }
}

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
console.log(`Updated image mappings: ${changed}`);
console.log(`Unresolved products: ${unresolved}`);
