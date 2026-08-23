import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-sand-dark/60 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-ocean-light">{siteConfig.name}</h3>
            <p className="mt-2 text-sm text-white/70">
              Lipa Mdogo Mdogo smartphones delivered to your door in Ukunda, Diani, Kwale and
              surrounding areas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-ocean-light">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              <li><Link href="/phones" className="hover:text-white">Browse Phones</Link></li>
              <li><Link href="/inquiry" className="hover:text-white">Send Inquiry</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ocean-light">Service Areas</h4>
            <p className="mt-2 text-sm text-white/70">
              {siteConfig.serviceAreas.join(" · ")}
            </p>
            <p className="mt-2 text-sm text-gold">Free delivery within Ukunda</p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
