import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getOrders, addOrder, updateOrder } from "@/lib/db";
import type { Order } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getOrders());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const order: Order = {
    id: crypto.randomUUID(),
    inquiryId: body.inquiryId,
    productId: body.productId,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    location: body.location,
    agentName: body.agentName ?? "",
    status: body.status ?? "registered",
    createdAt: new Date().toISOString(),
  };

  addOrder(order);
  return NextResponse.json(order);
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...patch } = await request.json();
  const updated = updateOrder(id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}
