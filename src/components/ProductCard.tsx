import Link from "next/link";
import Image from "next/image";
import type { PublicProduct } from "@/lib/types";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { PriceTerms } from "./PriceTerms";
import { WhatsAppButton } from "./WhatsAppButton";
import { productInquiryMessage } from "@/lib/whatsapp";
import { phoneImageSrc } from "@/lib/images";
// formatKES removed from this file; admin UI shows formatted values only.

export function ProductCard({ product }: { product: PublicProduct }) {
  const imageSrc = phoneImageSrc(product.image);

  // Do not display internal dealer margins or commissions on public site per spec.

  return (
    <article className="card-shadow flex flex-col overflow-hidden rounded-2xl bg-white">
      <Link href={`/phones/${product.id}`} className="relative aspect-square bg-sand">
        <Image
          src={imageSrc}
          alt={product.model}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ocean-mid">
              {product.brand}
            </p>
            <Link href={`/phones/${product.id}`}>
              <h3 className="font-bold text-navy hover:text-ocean-deep">{product.model}</h3>
            </Link>
            <p className="mt-1 text-xs text-muted">
              {product.specs.ram} RAM · {product.specs.storage}
            </p>
          </div>
          <AvailabilityBadge availability={product.availability} />
        </div>

        <PriceTerms
          customerPrice={product.customerPrice}
          deposit={product.deposit}
          dailyPayment={product.dailyPayment}
          compact
        />
        {/* Agent commission is internal only and intentionally not shown here. */}
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <WhatsAppButton
            message={productInquiryMessage(product.model)}
            fullWidth
          />
          <Link
            href={`/phones/${product.id}`}
            className="block rounded-xl bg-ocean-deep py-2.5 text-center text-sm font-semibold text-white transition hover:bg-ocean-mid"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
