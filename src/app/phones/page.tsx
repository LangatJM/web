import { getProducts } from "@/lib/db";
import { toPublicProducts } from "@/lib/products";
import { TrustBanner } from "@/components/TrustBanner";
import { PhonesList } from "@/components/PhonesList";

export const metadata = {
  title: "Browse Phones",
};

export default async function PhonesPage() {
  const products = toPublicProducts(await getProducts());

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Browse Phones</h1>
        <p className="mt-2 text-muted">{products.length} smartphones available on Lipa Mdogo Mdogo</p>
        <div className="mt-4">
          <TrustBanner />
        </div>

        <div className="mt-8">
          <PhonesList products={products} />
        </div>
      </div>
    </div>
  );
}
