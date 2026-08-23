import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { WhatsAppButton } from "./WhatsAppButton";
import { CallButton } from "./CallButton";
import { generalOrderMessage } from "@/lib/whatsapp";
import { TrustBanner } from "./TrustBanner";
import { getProducts } from "@/lib/db";
import { toPublicProducts } from "@/lib/products";
import { HeroCarousel } from "./HeroCarousel";

export async function Hero() {
  const featured = toPublicProducts(await getProducts()).slice(0, 4);

  return (
    <section className="relative overflow-hidden gradient-coastal px-4 py-16 text-white md:py-24">
      <div className="absolute inset-0 -z-10 flex items-end justify-center opacity-12">
        <Image src="/beach.jpg" alt="Beach background" fill className="object-cover" priority />
        <div className="absolute inset-0 -z-10 bg-black/12" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="relative flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              Lipa Mdogo Mdogo across Ukunda, Diani, Kwale and surrounding areas.
              Choose your phone, inquire, and pay little by little after delivery.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/phones"
                className="w-full rounded-xl bg-gold px-6 py-3.5 text-sm font-bold text-navy transition hover:bg-gold/90 sm:w-auto"
              >
                Browse Phones
              </Link>
              <WhatsAppButton message={generalOrderMessage()} className="w-full sm:w-auto" />
              <CallButton className="w-full sm:w-auto" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Fast Delivery
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 2v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Affordable Installments
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 2l3 7h7l-5.5 4 2 7-6-4-6 4 2-7L2 9h7l3-7z" stroke="currentColor" strokeWidth="0"/></svg>
                Genuine Phones
              </span>
            </div>

            <div className="mt-8">
              <TrustBanner />
            </div>
          </div>

          <div className="relative mt-8 md:mt-0 md:w-1/2">
            <HeroCarousel products={featured} />
          </div>
        </div>
      </div>
    </section>
  );
}
