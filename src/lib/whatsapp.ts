import { siteConfig } from "./config";

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function productInquiryMessage(model: string): string {
  return `Hello Simu Rahisi, I am interested in ${model}. I would like to know more about the Lipa Mdogo Mdogo payment option and the onboarding process.`;
}

export function generalOrderMessage(): string {
  return "Hello Simu Rahisi, I would like to order a smartphone on Lipa Mdogo Mdogo. Please guide me through the process.";
}
