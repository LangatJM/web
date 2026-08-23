export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  brand: string;
  model: string;
  specs: { ram: string; storage: string };
  customerPrice: number;
  dealerPrice: number;
  deposit: number;
  dailyPayment: number;
  margin: number;
  referralCommission: number;
  availability: Availability;
  image: string | null;
}

export interface PublicProduct {
  id: string;
  brand: string;
  model: string;
  specs: { ram: string; storage: string };
  customerPrice: number;
  deposit: number;
  dailyPayment: number;
  availability: Availability;
  image: string | null;
}

export type ContactMethod = "whatsapp" | "call" | "either";
export type PaymentFrequency = "daily" | "weekly" | "flexible";

export interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  location: string;
  preferredPhone: string;
  paymentFrequency: PaymentFrequency;
  contactMethod: ContactMethod;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "converted" | "closed";
}

export type OrderStatus =
  | "inquiry"
  | "registered"
  | "onboarding"
  | "delivered"
  | "active"
  | "completed";

export interface Order {
  id: string;
  inquiryId?: string;
  productId: string;
  customerName: string;
  customerPhone: string;
  location: string;
  agentName?: string;
  status: OrderStatus;
  createdAt: string;
  deliveredAt?: string;
  saleRecordedAt?: string;
}
