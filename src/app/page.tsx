import Link from "next/link";
import { getProducts } from "@/lib/db";
import { toPublicProducts } from "@/lib/products";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { ServiceAreas } from "@/components/ServiceAreas";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const featured = toPublicProducts(await getProducts()).slice(0, 8);
  return (
    <>
      <Hero />
      <HowItWorks />
      <TrustSection />
      <ServiceAreas />

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy md:text-3xl">Popular Phones</h2>
              <p className="mt-1 text-muted">Browse our Lipa Mdogo Mdogo catalogue</p>
            </div>
            <Link
              href="/phones"
              className="hidden text-sm font-semibold text-ocean-deep hover:underline sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/phones"
              className="inline-block rounded-xl bg-ocean-deep px-6 py-3 text-sm font-semibold text-white"
            >
              View All Phones
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
