"use client";

import { useMemo, useState, useEffect } from "react";
import type { PublicProduct } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function PhonesList({ products }: { products: PublicProduct[] }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = (params.get("q") ?? "").trim();
      if (q) setQuery(q);
    } catch (e) {
      // ignore
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.model.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div>
      <div className="mt-4 flex w-full items-center gap-3">
        <input
          aria-label="Search phones"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by model or brand..."
          className="w-full rounded-xl border border-sand-dark px-4 py-3 text-sm md:max-w-md"
        />
        <div className="hidden text-sm text-muted md:block">{filtered.length} results</div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
