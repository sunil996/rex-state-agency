"use client";

import Link from "next/link";
import { Building2, ClipboardList, Eye, Inbox } from "lucide-react";
import { formatRent } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function AdminDashboardPage() {
  const { properties, enquiries, valuations } = useStore();
  const live = properties.filter((p) => p.status === "available").length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const newValuations = valuations.filter((v) => v.status === "new").length;
  const viewings = enquiries.filter((e) => e.type === "viewing").length;

  const cards = [
    { label: "Live listings", value: live, icon: Building2, href: "/admin/properties" },
    { label: "New enquiries", value: newEnquiries, icon: Inbox, href: "/admin/enquiries" },
    { label: "Valuation requests", value: newValuations, icon: ClipboardList, href: "/admin/valuations" },
    { label: "Viewing requests", value: viewings, icon: Eye, href: "/admin/enquiries" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl uppercase tracking-[0.08em]">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-rex-stone">
        Overview of listings and inbound enquiries for the client demo.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="border border-rex-line bg-white p-5 transition hover:border-rex-gold"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.16em] text-rex-stone">
                  {card.label}
                </p>
                <Icon className="h-4 w-4 text-rex-gold" />
              </div>
              <p className="mt-4 font-display text-3xl">{card.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="border border-rex-line bg-white">
          <div className="border-b border-rex-line px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
              Recent enquiries
            </h2>
          </div>
          <ul className="divide-y divide-rex-line">
            {enquiries.slice(0, 5).map((e) => (
              <li key={e.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{e.name}</p>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-rex-gold">
                    {e.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-rex-stone">
                  {e.type}
                  {e.propertyRef ? ` · ${e.propertyRef}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-rex-line bg-white">
          <div className="border-b border-rex-line px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
              Latest listings
            </h2>
          </div>
          <ul className="divide-y divide-rex-line">
            {properties.slice(0, 5).map((p) => (
              <li key={p.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{p.address}</p>
                  <p className="text-sm">{formatRent(p.rent)}</p>
                </div>
                <p className="mt-1 text-sm capitalize text-rex-stone">
                  {p.status.replace("-", " ")} · {p.beds} bed · {p.city}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
