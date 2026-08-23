import type { Product } from "./types";

export function contributionMargin(product: Product): number {
  if (typeof product.margin === "number") return product.margin;
  return Math.max(0, (product.customerPrice || 0) - (product.dealerPrice || 0));
}

export function commission50(product: Product): number {
  const margin = contributionMargin(product);
  return Math.round(margin * 0.5);
}
