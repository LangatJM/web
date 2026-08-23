import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProducts, getOrders } from "@/lib/db";
import { formatKES } from "@/lib/format";

export default async function AdminCommissionsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const products = await getProducts();
  const orders = (await getOrders()).filter((o) =>
    ["delivered", "active", "completed"].includes(o.status)
  );

  const rows = orders.map((order) => {
    const product = products.find((p) => p.id === order.productId);
    return {
      orderId: order.id,
      customer: order.customerName,
      product: product?.model ?? "Unknown",
      margin: product?.margin ?? 0,
      commission: product?.referralCommission ?? 0,
      status: order.status,
    };
  });

  const totalCommission = rows.reduce((s, r) => s + r.commission, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Referral Commissions</h1>
      <p className="mt-2 text-sm text-muted">
        Commission = 50% × dealer margin. Internal use only — never shown to customers.
      </p>

      <div className="mt-4 rounded-2xl bg-ocean-deep/10 p-4">
        <p className="text-sm text-muted">Total estimated commissions</p>
        <p className="text-2xl font-bold text-ocean-deep">{formatKES(totalCommission)}</p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white card-shadow">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b bg-sand/50">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Margin</th>
              <th className="p-3">Commission (50%)</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted">
                  No sales recorded yet.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.orderId} className="border-b border-sand-dark/50">
                <td className="p-3">{row.customer}</td>
                <td className="p-3">{row.product}</td>
                <td className="p-3">{formatKES(row.margin)}</td>
                <td className="p-3 font-semibold text-gold">{formatKES(row.commission)}</td>
                <td className="p-3 capitalize">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
