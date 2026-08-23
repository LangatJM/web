import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/db";
import { toPublicProduct } from "@/lib/products";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { PriceTerms } from "@/components/PriceTerms";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallButton } from "@/components/CallButton";
import { TrustBanner } from "@/components/TrustBanner";
import { productInquiryMessage } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";
import { phoneImageSrc } from "@/lib/images";
// Internal commission/ dealer prices are intentionally not shown on public pages.

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Phone Not Found" };
  return { title: product.model };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const raw = await getProduct(id);
  if (!raw) notFound();

  const product = toPublicProduct(raw);
  const imageSrc = phoneImageSrc(product.image);

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/phones" className="text-sm text-ocean-deep hover:underline">
          ← Back to phones
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square rounded-2xl bg-sand">
            <Image
              src={imageSrc}
              alt={product.model}
              fill
              className="object-contain p-6"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ocean-mid">
              {product.brand}
            </p>
            <h1 className="text-2xl font-bold text-navy md:text-3xl">{product.model}</h1>
            <div className="mt-2">
              <AvailabilityBadge availability={product.availability} />
            </div>

            <div className="mt-6 rounded-2xl bg-white p-5 card-shadow">
              <h2 className="font-semibold text-navy">Lipa Mdogo Mdogo Terms</h2>
              <div className="mt-3">
                <PriceTerms
                  customerPrice={product.customerPrice}
                  deposit={product.deposit}
                  dailyPayment={product.dailyPayment}
                />
              </div>
              {/* Per site guardrails, do not show dealer price, margin, or commission on public pages */}
            </div>

            <div className="mt-4 space-y-2 text-sm text-muted">
              <p><span className="font-medium text-foreground">RAM:</span> {product.specs.ram}</p>
              <p><span className="font-medium text-foreground">Storage:</span> {product.specs.storage}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <WhatsAppButton
                message={productInquiryMessage(product.model)}
                fullWidth
              />
              <CallButton fullWidth />
              <Link
                href={`/inquiry?phone=${encodeURIComponent(product.model)}`}
                className="block rounded-xl border-2 border-ocean-deep py-3 text-center text-sm font-semibold text-ocean-deep transition hover:bg-ocean-deep hover:text-white"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <TrustBanner />
          <div className="rounded-2xl bg-sand p-5 text-sm text-muted">
            <h3 className="font-semibold text-navy">Delivery</h3>
            <p className="mt-2">
              Free delivery within Ukunda. Delivery to Diani, Kwale and surrounding areas is
              confirmed with your agent. {siteConfig.trustRule}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
