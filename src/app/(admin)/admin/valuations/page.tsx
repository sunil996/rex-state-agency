"use client";

import { useStore } from "@/lib/store";

export default function AdminValuationsPage() {
  const { valuations, updateValuationStatus } = useStore();

  return (
    <div>
      <h1 className="font-display text-2xl uppercase tracking-[0.08em]">
        Valuation Requests
      </h1>
      <p className="mt-2 text-sm text-rex-stone">
        Landlord rental valuation bookings from the website form.
      </p>

      <div className="mt-8 overflow-x-auto border border-rex-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-rex-line bg-[#fafaf8] text-xs uppercase tracking-[0.14em] text-rex-stone">
            <tr>
              <th className="px-4 py-3">Landlord</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Beds</th>
              <th className="px-4 py-3">Preferred date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {valuations.map((v) => (
              <tr key={v.id} className="border-b border-rex-line last:border-0">
                <td className="px-4 py-4">
                  <p className="font-medium">{v.name}</p>
                  <p className="text-xs text-rex-stone">
                    {v.email} · {v.phone}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p>{v.address}</p>
                  <p className="text-xs capitalize text-rex-stone">
                    {v.postcode} · {v.propertyType}
                  </p>
                  {v.notes ? (
                    <p className="mt-1 max-w-xs text-xs text-rex-stone">
                      {v.notes}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-4">{v.beds}</td>
                <td className="px-4 py-4">{v.preferredDate}</td>
                <td className="px-4 py-4">
                  <span
                    className={`text-[10px] uppercase tracking-[0.14em] ${
                      v.status === "new"
                        ? "bg-rex-gold px-2 py-1 text-rex-ink"
                        : "text-rex-stone"
                    }`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <select
                    className="border border-rex-line bg-white px-2 py-1.5 text-xs"
                    value={v.status}
                    onChange={(e) =>
                      updateValuationStatus(
                        v.id,
                        e.target.value as typeof v.status,
                      )
                    }
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
