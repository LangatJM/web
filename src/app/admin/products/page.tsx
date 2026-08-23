"use client";

import { useEffect, useState } from "react";
import type { Product, Availability } from "@/lib/types";
import { formatKES } from "@/lib/format";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const filtered = products.filter(
    (p) =>
      p.model.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  async function saveProduct(product: Product) {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const saved = await res.json();
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [...prev, saved];
    });
    setEditing(null);
  }

  async function removeProduct(id: string) {
    if (!confirm("Remove this product?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Products</h1>
        <button
          type="button"
          onClick={() =>
            setEditing({
              id: "",
              brand: "",
              model: "",
              specs: { ram: "4GB", storage: "64GB" },
              customerPrice: 0,
              dealerPrice: 0,
              deposit: 0,
              dailyPayment: 0,
              margin: 0,
              referralCommission: 0,
              availability: "in_stock",
              image: null,
            })
          }
          className="rounded-xl bg-ocean-deep px-4 py-2 text-sm font-semibold text-white"
        >
          Add Product
        </button>
      </div>

      <input
        type="search"
        placeholder="Search products..."
        className="mt-4 w-full rounded-xl border border-sand-dark px-4 py-2 text-sm md:max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {editing && (
        <ProductEditor
          product={editing}
          onSave={saveProduct}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white card-shadow">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-sand-dark bg-sand/50">
            <tr>
              <th className="p-3">Model</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Dealer</th>
              <th className="p-3">Margin</th>
              <th className="p-3">Commission</th>
              <th className="p-3">Daily</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-sand-dark/50">
                <td className="p-3">
                  <p className="font-medium">{p.model}</p>
                  <p className="text-xs text-muted">{p.brand}</p>
                </td>
                <td className="p-3">{formatKES(p.customerPrice)}</td>
                <td className="p-3 text-muted">{formatKES(p.dealerPrice)}</td>
                <td className="p-3">{formatKES(p.margin)}</td>
                <td className="p-3 font-semibold text-gold">{formatKES(p.referralCommission)}</td>
                <td className="p-3">{formatKES(p.dailyPayment)}</td>
                <td className="p-3 capitalize">{p.availability.replace("_", " ")}</td>
                <td className="p-3">
                  <button
                    type="button"
                    className="mr-2 text-ocean-deep hover:underline"
                    onClick={() => setEditing(p)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-coral hover:underline"
                    onClick={() => removeProduct(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductEditor({
  product,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(product);
  const margin = form.customerPrice - form.dealerPrice;
  const commission = Math.round(margin * 0.5);

  return (
    <div className="mt-4 rounded-2xl bg-white p-6 card-shadow">
      <h2 className="font-bold text-navy">{form.id ? "Edit Product" : "New Product"}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(["brand", "model", "image"] as const).map((field) => (
          <div key={field}>
            <label className="text-xs font-medium capitalize">{field}</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form[field] ?? ""}
              onChange={(e) => setForm({ ...form, [field]: e.target.value || null })}
            />
          </div>
        ))}
        {(["customerPrice", "dealerPrice", "deposit", "dailyPayment"] as const).map((field) => (
          <div key={field}>
            <label className="text-xs font-medium">{field}</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })}
            />
          </div>
        ))}
        <div>
          <label className="text-xs font-medium">RAM / Storage</label>
          <div className="mt-1 flex gap-2">
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={form.specs.ram}
              onChange={(e) => setForm({ ...form, specs: { ...form.specs, ram: e.target.value } })}
            />
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={form.specs.storage}
              onChange={(e) => setForm({ ...form, specs: { ...form.specs, storage: e.target.value } })}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium">Availability</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.value as Availability })}
          >
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">
        Margin: {formatKES(margin)} · Commission (50%): {formatKES(commission)}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onSave({ ...form, margin, referralCommission: commission })}
          className="rounded-xl bg-ocean-deep px-4 py-2 text-sm font-semibold text-white"
        >
          Save
        </button>
        <button type="button" onClick={onCancel} className="rounded-xl border px-4 py-2 text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
