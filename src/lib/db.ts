import fs from "fs";
import path from "path";
import type { Inquiry, Order, Product } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(file: string, fallback: T): T {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function writeJson<T>(file: string, data: T): void {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Attempt to load Prisma if DATABASE_URL is configured. Prisma usage is optional;
// when not available we fall back to the JSON file-based store to remain backwards-compatible.
let prisma: any = null;
if (process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require("@prisma/client");
    prisma = new PrismaClient();
  } catch (e) {
    prisma = null;
  }
}

function mapPrismaProduct(row: any): Product {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    image: row.image,
    customerPrice: row.customerPrice,
    dealerPrice: row.dealerPrice,
    deposit: row.deposit,
    dailyPayment: row.dailyPayment,
    margin: row.margin,
    referralCommission: row.referralCommission,
    availability: row.availability as any,
    specs: row.specs ?? { ram: "", storage: "" },
  } as Product;
}

export async function getProducts(): Promise<Product[]> {
  if (prisma) {
    const rows = await prisma.product.findMany();
    return rows.map(mapPrismaProduct);
  }
  return readJson<Product[]>("products.json", []);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  if (prisma) {
    const row = await prisma.product.findUnique({ where: { id } });
    return row ? mapPrismaProduct(row) : undefined;
  }
  return getProducts().then((ps) => ps.find((p) => p.id === id));
}

export async function saveProducts(products: Product[]): Promise<void> {
  if (prisma) {
    // replace all products in the DB (simple approach for seeding)
    await prisma.product.deleteMany();
    await prisma.product.createMany({ data: products.map((p) => ({
      id: p.id,
      brand: p.brand,
      model: p.model,
      image: p.image,
      customerPrice: p.customerPrice,
      dealerPrice: p.dealerPrice,
      deposit: p.deposit,
      dailyPayment: p.dailyPayment,
      margin: p.margin,
      referralCommission: p.referralCommission,
      availability: p.availability,
      specs: p.specs as any,
    })) });
    return;
  }
  writeJson("products.json", products);
}

export async function upsertProduct(product: Product): Promise<void> {
  if (prisma) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
    return;
  }
  const products = await getProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) products[idx] = product;
  else products.push(product);
  await saveProducts(products);
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (prisma) {
    await prisma.product.delete({ where: { id } });
    return true;
  }
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await saveProducts(filtered);
  return true;
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (prisma) {
    return await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  }
  return readJson<Inquiry[]>("inquiries.json", []);
}

export async function addInquiry(inquiry: Inquiry): Promise<void> {
  if (prisma) {
    await prisma.inquiry.create({ data: inquiry as any });
    return;
  }
  const inquiries = readJson<Inquiry[]>("inquiries.json", []);
  inquiries.unshift(inquiry);
  writeJson("inquiries.json", inquiries);
}

export async function updateInquiry(id: string, patch: Partial<Inquiry>): Promise<Inquiry | null> {
  if (prisma) {
    const updated = await prisma.inquiry.update({ where: { id }, data: patch as any });
    return updated as Inquiry;
  }
  const inquiries = readJson<Inquiry[]>("inquiries.json", []);
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx < 0) return null;
  inquiries[idx] = { ...inquiries[idx], ...patch };
  writeJson("inquiries.json", inquiries);
  return inquiries[idx];
}

export async function getOrders(): Promise<Order[]> {
  if (prisma) {
    return await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  }
  return readJson<Order[]>("orders.json", []);
}

export async function addOrder(order: Order): Promise<void> {
  if (prisma) {
    await prisma.order.create({ data: order as any });
    return;
  }
  const orders = readJson<Order[]>("orders.json", []);
  orders.unshift(order);
  writeJson("orders.json", orders);
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  if (prisma) {
    const updated = await prisma.order.update({ where: { id }, data: patch as any });
    return updated as Order;
  }
  const orders = readJson<Order[]>("orders.json", []);
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  orders[idx] = { ...orders[idx], ...patch };
  writeJson("orders.json", orders);
  return orders[idx];
}
