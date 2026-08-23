"use client";

import { useEffect, useState } from "react";
import type { Inquiry } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then(setInquiries)
      .catch(() => {});
  }, []);

  async function updateStatus(id: string, status: Inquiry["status"]) {
    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const updated = await res.json();
    setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Inquiries</h1>
      <div className="mt-6 space-y-4">
        {inquiries.length === 0 && (
          <p className="text-muted">No inquiries yet.</p>
        )}
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="rounded-2xl bg-white p-5 card-shadow">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-bold text-navy">{inquiry.fullName}</p>
                <p className="text-sm text-muted">{inquiry.phone} · {inquiry.location}</p>
              </div>
              <select
                value={inquiry.status}
                onChange={(e) => updateStatus(inquiry.id, e.target.value as Inquiry["status"])}
                className="rounded-lg border px-2 py-1 text-sm capitalize"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="mt-3 grid gap-1 text-sm text-muted sm:grid-cols-2">
              <p><span className="font-medium text-foreground">Preferred phone:</span> {inquiry.preferredPhone || "—"}</p>
              <p><span className="font-medium text-foreground">Contact via:</span> {inquiry.contactMethod}</p>
              <p><span className="font-medium text-foreground">Payment:</span> {inquiry.paymentFrequency}</p>
              <p><span className="font-medium text-foreground">Date:</span> {formatDate(inquiry.createdAt)}</p>
            </div>
            {inquiry.message && (
              <p className="mt-3 rounded-lg bg-sand/50 p-3 text-sm">{inquiry.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
