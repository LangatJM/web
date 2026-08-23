"use client";

import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import type { Product } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/orders").then((r) => r.json()),
      fetch("/api/admin/products").then((r) => r.json()),
    ]).then(([o, p]) => {
      setOrders(o);
      setProducts(p);
    });
  }, []);

  async function updateStatus(id: string, status: OrderStatus) {
    const patch: Partial<Order> = { status };
    if (status === "delivered") patch.deliveredAt = new Date().toISOString();
    if (status === "completed") patch.saleRecordedAt = new Date().toISOString();

    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    const updated = await res.json();
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Orders & Onboarding</h1>
      <div className="mt-6 space-y-4">
        {orders.length === 0 && <p className="text-muted">No orders yet. Create orders from converted inquiries.</p>}
        {orders.map((order) => {
          const product = products.find((p) => p.id === order.productId);
          return (
            <div key={order.id} className="rounded-2xl bg-white p-5 card-shadow">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-navy">{order.customerName}</p>
                  <p className="text-sm text-muted">{order.customerPhone} · {order.location}</p>
                  <p className="mt-1 text-sm">{product?.model ?? order.productId}</p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                  className="rounded-lg border px-2 py-1 text-sm capitalize"
                >
                  <option value="inquiry">Inquiry</option>
                  <option value="registered">Registered</option>
                  <option value="onboarding">Onboarding</option>
                  <option value="delivered">Delivered</option>
                  <option value="active">Active (paying)</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mt-2 text-xs text-muted">
                Created {formatDate(order.createdAt)}
                {order.agentName && ` · Agent: ${order.agentName}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
