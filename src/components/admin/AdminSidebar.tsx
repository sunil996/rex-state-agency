"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  ClipboardList,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Plus,
} from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { useStore } from "@/lib/store";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/properties/new", label: "Add Property", icon: Plus },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/valuations", label: "Valuations", icon: ClipboardList },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setAdminAuthed } = useStore();

  return (
    <aside className="flex w-full flex-col border-r border-white/10 bg-rex-black text-white lg:min-h-screen lg:w-64">
      <div className="border-b border-white/10 px-5 py-5">
        <BrandLogo variant="mark" href="/admin" className="!h-12 !w-12 rounded-sm" />
        <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-rex-gold">
          Agency Admin
        </p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-rex-gold/15 text-rex-gold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white"
        >
          <Home className="h-4 w-4" />
          View website
        </Link>
        <button
          type="button"
          onClick={() => {
            setAdminAuthed(false);
            router.push("/admin");
          }}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
