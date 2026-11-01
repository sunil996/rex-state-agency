"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchBar } from "@/components/property/SearchBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useStore } from "@/lib/store";

export function PropertiesClient() {
  const { properties } = useStore();
  const params = useSearchParams();

  const filters = {
    query: params.get("q") ?? "",
    city: params.get("city") ?? "",
    beds: params.get("beds") ?? "",
    maxRent: params.get("maxRent") ?? "",
    type: params.get("type") ?? "",
    status: params.get("status") ?? "",
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.beds && p.beds < Number(filters.beds)) return false;
      if (filters.maxRent && p.rent > Number(filters.maxRent)) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const hay =
          `${p.address} ${p.area} ${p.postcode} ${p.city} ${p.ref}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [properties, filters]);

  return (
    <div className="bg-rex-cream pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <SectionHeading
          number="01"
          title="Properties to Rent"
          subtitle="Search available lettings across London and Southampton."
        />
        <SearchBar variant="page" initial={filters} />

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "All", value: "" },
            { label: "Available", value: "available" },
            { label: "Let Agreed", value: "let-agreed" },
            { label: "Under Offer", value: "under-offer" },
          ].map((item) => {
            const active = filters.status === item.value;
            const next = new URLSearchParams();
            if (filters.query) next.set("q", filters.query);
            if (filters.city) next.set("city", filters.city);
            if (filters.beds) next.set("beds", filters.beds);
            if (filters.maxRent) next.set("maxRent", filters.maxRent);
            if (filters.type) next.set("type", filters.type);
            if (item.value) next.set("status", item.value);
            return (
              <a
                key={item.label}
                href={`/properties?${next.toString()}`}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] ${
                  active
                    ? "bg-rex-ink text-white"
                    : "border border-rex-line text-rex-stone hover:border-rex-gold hover:text-rex-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-rex-stone">
          Showing {filtered.length}{" "}
          {filtered.length === 1 ? "property" : "properties"}
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 border border-rex-line bg-white p-10 text-center">
            <p className="font-display text-xl uppercase tracking-[0.08em]">
              No properties match
            </p>
            <p className="mt-2 text-rex-stone">
              Try adjusting your filters or browse all available rentals.
            </p>
            <a href="/properties" className="rex-btn-primary mt-6 inline-flex">
              Clear filters
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
