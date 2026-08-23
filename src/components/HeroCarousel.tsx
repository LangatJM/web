"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PublicProduct } from "@/lib/types";
import { phoneImageSrc } from "@/lib/images";

export function HeroCarousel({ products }: { products: PublicProduct[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % products.length), 4000);
    return () => clearInterval(t);
  }, [products.length]);

  if (!products || products.length === 0) return null;

  const current = products[index];

  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-2xl bg-sand md:h-72">
        <Image
          src={phoneImageSrc(current.image)}
          alt={current.model}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + products.length) % products.length)}
          className="rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
        >
          ‹
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % products.length)}
          className="rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
        >
          ›
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {products.map((p, i) => (
          <button
            key={p.id}
            aria-label={`Go to ${p.model}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
