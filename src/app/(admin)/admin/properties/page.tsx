"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { formatRent, statusLabel } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function AdminPropertiesPage() {
  const { properties, deleteProperty } = useStore();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-[0.08em]">
            Properties
          </h1>
          <p className="mt-2 text-sm text-rex-stone">
            Manage rental listings shown on the public website.
          </p>
        </div>
        <Link href="/admin/properties/new" className="rex-btn-primary">
          <Plus className="h-4 w-4" />
          Add property
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-rex-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-rex-line bg-[#fafaf8] text-xs uppercase tracking-[0.14em] text-rex-stone">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Rent</th>
              <th className="px-4 py-3">Beds</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-b border-rex-line last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-rex-charcoal">
                      <Image
                        src={p.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{p.address}</p>
                      <p className="text-xs text-rex-stone">{p.ref}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">
                  {statusLabel(p.status)}
                </td>
                <td className="px-4 py-3">{formatRent(p.rent)}</td>
                <td className="px-4 py-3">{p.beds}</td>
                <td className="px-4 py-3">{p.city}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/properties/${p.id}`}
                      className="border border-rex-line p-2 hover:border-rex-gold"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete ${p.address}?`)) deleteProperty(p.id);
                      }}
                      className="border border-rex-line p-2 hover:border-red-400 hover:text-red-600"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
