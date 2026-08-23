import { siteConfig } from "@/lib/config";

export function ServiceAreas() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-navy md:text-3xl">We Deliver Near You</h2>
        <p className="mt-4 text-muted">
          We serve customers in{" "}
          <span className="font-semibold text-foreground">
            {siteConfig.serviceAreas.join(", ")}
          </span>
          .
        </p>
        <div className="mt-6 inline-block rounded-2xl bg-ocean-deep/10 px-6 py-4">
          <p className="font-bold text-ocean-deep">Free delivery within Ukunda</p>
          <p className="mt-1 text-sm text-muted">
            Delivery to Diani, Kwale and other areas is confirmed with your agent during inquiry.
          </p>
        </div>
      </div>
    </section>
  );
}
