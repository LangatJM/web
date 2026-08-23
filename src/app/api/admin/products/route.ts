import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProducts, upsertProduct, deleteProduct } from "@/lib/db";
import type { Product } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getProducts());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Product;
  const retail = Number(body.customerPrice);
  const dealer = Number(body.dealerPrice);
  const margin = retail - dealer;

  const product: Product = {
    ...body,
    id: body.id || crypto.randomUUID(),
    customerPrice: retail,
    dealerPrice: dealer,
    deposit: Number(body.deposit),
    dailyPayment: Number(body.dailyPayment),
    margin,
    referralCommission: Math.round(margin * 0.5),
  };

  await upsertProduct(product);
  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
