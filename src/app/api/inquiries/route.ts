import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/db";
import type { ContactMethod, Inquiry, PaymentFrequency } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();

  const inquiry: Inquiry = {
    id: crypto.randomUUID(),
    fullName: String(body.fullName ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    location: String(body.location ?? "").trim(),
    preferredPhone: String(body.preferredPhone ?? "").trim(),
    paymentFrequency: (body.paymentFrequency ?? "daily") as PaymentFrequency,
    contactMethod: (body.contactMethod ?? "whatsapp") as ContactMethod,
    message: String(body.message ?? "").trim(),
    createdAt: new Date().toISOString(),
    status: "new",
  };

  if (!inquiry.fullName || !inquiry.phone || !inquiry.location) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  addInquiry(inquiry);
  return NextResponse.json({ ok: true, id: inquiry.id });
}
