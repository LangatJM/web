import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/commissions", label: "Commissions" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-sand/50">
      {authed && (
        <header className="border-b border-sand-dark bg-navy text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <span className="font-bold text-ocean-light">Simu Rahisi Admin</span>
            <AdminLogoutButton />
          </div>
          <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
