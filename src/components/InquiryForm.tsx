"use client";

import { useState } from "react";
import type { ContactMethod, PaymentFrequency } from "@/lib/types";
import { WhatsAppButton } from "./WhatsAppButton";
import { CallButton } from "./CallButton";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface InquiryFormProps {
  phones: { id: string; model: string }[];
  defaultPhone?: string;
}

export function InquiryForm({ phones, defaultPhone }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    preferredPhone: defaultPhone ?? "",
    paymentFrequency: "daily" as PaymentFrequency,
    contactMethod: "whatsapp" as ContactMethod,
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    const summary = `Hello Simu Rahisi, I submitted an inquiry.\nName: ${formData.fullName}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nPreferred phone: ${formData.preferredPhone || "Not specified"}\nMessage: ${formData.message || "None"}`;

    return (
      <div className="card-shadow rounded-2xl bg-white p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          ✓
        </div>
        <h2 className="mt-4 text-xl font-bold text-navy">Inquiry Received!</h2>
        <p className="mt-2 text-muted">
          Thank you, {formData.fullName}. Our team will contact you soon. You can also reach us
          right now:
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <WhatsAppButton message={summary} label="Continue on WhatsApp" />
          <CallButton />
        </div>
        <a
          href={buildWhatsAppUrl(summary)}
          className="mt-4 inline-block text-sm text-ocean-deep underline"
        >
          Or open WhatsApp in a new tab
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-shadow space-y-5 rounded-2xl bg-white p-6 md:p-8">
      <div>
        <label className="block text-sm font-medium text-navy">Full Name *</label>
        <input
          required
          type="text"
          className="mt-1 w-full rounded-xl border border-sand-dark bg-sand/30 px-4 py-3 text-sm outline-none focus:border-ocean-deep"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy">Phone Number *</label>
        <input
          required
          type="tel"
          placeholder="07XX XXX XXX"
          className="mt-1 w-full rounded-xl border border-sand-dark bg-sand/30 px-4 py-3 text-sm outline-none focus:border-ocean-deep"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy">Location *</label>
        <input
          required
          type="text"
          placeholder="e.g. Ukunda, Diani, Kwale"
          className="mt-1 w-full rounded-xl border border-sand-dark bg-sand/30 px-4 py-3 text-sm outline-none focus:border-ocean-deep"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy">Preferred Phone</label>
        <select
          className="mt-1 w-full rounded-xl border border-sand-dark bg-sand/30 px-4 py-3 text-sm outline-none focus:border-ocean-deep"
          value={formData.preferredPhone}
          onChange={(e) => setFormData({ ...formData, preferredPhone: e.target.value })}
        >
          <option value="">Select a phone (optional)</option>
          {phones.map((p) => (
            <option key={p.id} value={p.model}>{p.model}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-navy">Payment Frequency</label>
          <select
            className="mt-1 w-full rounded-xl border border-sand-dark bg-sand/30 px-4 py-3 text-sm outline-none focus:border-ocean-deep"
            value={formData.paymentFrequency}
            onChange={(e) =>
              setFormData({ ...formData, paymentFrequency: e.target.value as PaymentFrequency })
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="flexible">Flexible / Not sure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy">Preferred Contact</label>
          <select
            className="mt-1 w-full rounded-xl border border-sand-dark bg-sand/30 px-4 py-3 text-sm outline-none focus:border-ocean-deep"
            value={formData.contactMethod}
            onChange={(e) =>
              setFormData({ ...formData, contactMethod: e.target.value as ContactMethod })
            }
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Phone Call</option>
            <option value="either">Either</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy">Message</label>
        <textarea
          rows={3}
          placeholder="Any questions or special requests?"
          className="mt-1 w-full rounded-xl border border-sand-dark bg-sand/30 px-4 py-3 text-sm outline-none focus:border-ocean-deep"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-coral">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-ocean-deep py-3.5 text-sm font-bold text-white transition hover:bg-ocean-mid disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
