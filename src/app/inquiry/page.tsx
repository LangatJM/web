import { getProducts } from "@/lib/db";
import { InquiryForm } from "@/components/InquiryForm";
import { TrustBanner } from "@/components/TrustBanner";

export const metadata = {
  title: "Send Inquiry",
};

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string }>;
}) {
  const { phone } = await searchParams;
  const phones = (await getProducts()).map((p) => ({ id: p.id, model: p.model }));

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Send an Inquiry</h1>
        <p className="mt-2 text-muted">
          Tell us what you need and we will get back to you. No payment required at this stage.
        </p>
        <div className="mt-4">
          <TrustBanner />
        </div>
        <div className="mt-8">
          <InquiryForm phones={phones} defaultPhone={phone} />
        </div>
      </div>
    </div>
  );
}
