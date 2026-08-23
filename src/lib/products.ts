import type { Product, PublicProduct } from "./types";

export function toPublicProduct(product: Product): PublicProduct {
  return {
    id: product.id,
    brand: product.brand,
    model: product.model,
    specs: product.specs,
    customerPrice: product.customerPrice,
    deposit: product.deposit,
    dailyPayment: product.dailyPayment,
    availability: product.availability,
    image: product.image,
  };
}

export function toPublicProducts(products: Product[]): PublicProduct[] {
  return products.map(toPublicProduct);
}
