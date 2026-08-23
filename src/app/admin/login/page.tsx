"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-xl font-bold text-navy">Admin Login</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 card-shadow">
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            className="mt-1 w-full rounded-xl border border-sand-dark px-4 py-3 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-coral">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-ocean-deep py-3 text-sm font-bold text-white"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
