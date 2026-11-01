"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useStore } from "@/lib/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminAuthed, setAdminAuthed, ready } = useStore();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rex-cream text-sm text-rex-stone">
        Loading admin…
      </div>
    );
  }

  if (!adminAuthed) {
    return (
      <div className="rex-grain flex min-h-screen items-center justify-center bg-rex-black px-4 text-white">
        <div className="w-full max-w-md border border-white/10 bg-rex-charcoal p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-rex-gold">
            Rex Agency
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-[0.12em]">
            Admin Demo
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Presentation gate only — no real authentication yet. Continue to
            explore the properties, enquiries and valuation dashboard UI.
          </p>
          <button
            type="button"
            className="rex-btn-primary mt-8 w-full"
            onClick={() => setAdminAuthed(true)}
          >
            Continue to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f2ee] lg:flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b border-rex-line bg-white px-4 py-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.18em] text-rex-stone">
            Rex Estate Agents · Demo administration
          </p>
        </div>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
