import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProducts, getInquiries, getOrders } from "@/lib/db";

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const products = await getProducts();
  const inquiries = await getInquiries();
  const orders = await getOrders();
  const newInquiries = inquiries.filter((i) => i.status === "new").length;
  const activeOrders = orders.filter((o) => !["completed"].includes(o.status)).length;
  const totalCommission = orders
    .filter((o) => o.status === "completed" || o.status === "active")
    .reduce((sum, o) => {
      const product = products.find((p) => p.id === o.productId);
      return sum + (product?.referralCommission ?? 0);
    }, 0);

  const stats = [
    { label: "Products", value: products.length, href: "/admin/products" },
    { label: "New Inquiries", value: newInquiries, href: "/admin/inquiries" },
    { label: "Active Orders", value: activeOrders, href: "/admin/orders" },
    { label: "Est. Commissions", value: `KES ${totalCommission.toLocaleString()}`, href: "/admin/commissions" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card-shadow rounded-2xl bg-white p-5 transition hover:ring-2 hover:ring-ocean-light"
          >
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-ocean-deep">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
