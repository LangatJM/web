import type { Availability } from "@/lib/types";

const labels: Record<Availability, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
};

const styles: Record<Availability, string> = {
  in_stock: "bg-emerald-100 text-emerald-800",
  low_stock: "bg-amber-100 text-amber-800",
  out_of_stock: "bg-red-100 text-red-800",
};

export function AvailabilityBadge({ availability }: { availability: Availability }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[availability]}`}>
      {labels[availability]}
    </span>
  );
}
