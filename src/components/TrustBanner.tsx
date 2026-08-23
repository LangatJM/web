import { siteConfig } from "@/lib/config";

export function TrustBanner() {
  return (
    <div className="rounded-2xl border border-ocean-light/30 bg-ocean-deep/5 px-4 py-3 text-center">
      <p className="text-sm font-medium text-ocean-deep">
        ✓ {siteConfig.trustRule}
      </p>
    </div>
  );
}
