import { siteConfig } from "@/lib/config";

export function TrustSection() {
  return (
    <section className="bg-sand px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          How Your Order Works
        </h2>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            When you inquire about a phone, our sales agent will walk you through the full
            Lipa Mdogo Mdogo process — including your deposit, daily payment, and delivery
            details for your area.
          </p>
          <p>
            An agent will bring the phone to you in person. You inspect it, confirm it is
            what you wanted, and only then does your payment plan begin. There is no online
            checkout and no payment before delivery.
          </p>
          <p className="rounded-xl border-l-4 border-ocean-deep bg-white p-4 font-medium text-ocean-deep">
            {siteConfig.trustRule}
          </p>
        </div>
      </div>
    </section>
  );
}
