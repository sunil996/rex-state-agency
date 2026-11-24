"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useStore } from "@/lib/store";

interface SearchBarProps {
  variant?: "hero" | "page";
  initial?: {
    query?: string;
    area?: string;
    city?: string;
    beds?: string;
    maxRent?: string;
    type?: string;
  };
}

const typeLabels: Record<string, string> = {
  apartment: "Apartment",
  flat: "Flat",
  house: "House",
  studio: "Studio",
};

export function SearchBar({ variant = "hero", initial }: SearchBarProps) {
  const router = useRouter();
  const { properties } = useStore();
  const [query, setQuery] = useState(initial?.query ?? "");
  const [area, setArea] = useState(initial?.area ?? "");
  const [beds, setBeds] = useState(initial?.beds ?? "");
  const [maxRent, setMaxRent] = useState(initial?.maxRent ?? "");
  const [type, setType] = useState(initial?.type ?? "");
  const hasAdvanced =
    Boolean(initial?.area) ||
    Boolean(initial?.beds) ||
    Boolean(initial?.maxRent) ||
    Boolean(initial?.type);
  const [filtersOpen, setFiltersOpen] = useState(hasAdvanced);

  const areas = useMemo(
    () =>
      [...new Set(properties.map((p) => p.area).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [properties],
  );

  const types = useMemo(
    () =>
      [...new Set(properties.map((p) => p.type))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [properties],
  );

  const activeFilterCount = [area, beds, maxRent, type].filter(Boolean).length;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (area) params.set("area", area);
    if (beds) params.set("beds", beds);
    if (maxRent) params.set("maxRent", maxRent);
    if (type) params.set("type", type);
    router.push(`/properties?${params.toString()}`);
  }

  const isHero = variant === "hero";
  const isPage = variant === "page";

  const shell = isHero
    ? "border border-white/15 bg-black/50 p-3 backdrop-blur-md sm:p-4 md:p-5"
    : "border border-rex-line bg-white p-3 sm:p-4 md:p-5";

  const cell = isHero
    ? "min-w-0 border border-white/15 bg-white/[0.04] p-3 lg:border-0 lg:bg-transparent lg:p-0"
    : "min-w-0 border border-rex-line bg-rex-cream/40 p-3 lg:border-0 lg:bg-transparent lg:p-0";

  const label = isHero
    ? "mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-white/55"
    : "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-rex-stone";

  const control = isHero
    ? "w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40 lg:border lg:border-white/15 lg:bg-white/5 lg:px-3 lg:py-3"
    : "w-full min-w-0 bg-transparent text-sm text-rex-ink outline-none placeholder:text-rex-stone lg:border lg:border-rex-line lg:bg-rex-surface lg:px-4 lg:py-3 lg:focus:border-rex-gold";

  return (
    <form onSubmit={onSubmit} className={shell}>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 lg:items-end lg:gap-3">
        <div className={`${cell} col-span-2 lg:col-span-2`}>
          <label className={label}>Location / Postcode</label>
          <input
            className={control}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Eastleigh or SO14"
          />
        </div>

        {isPage ? (
          <div className="col-span-2 lg:hidden">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-between border border-rex-line bg-rex-cream/40 px-3 text-xs uppercase tracking-[0.16em] text-rex-ink"
              aria-expanded={filtersOpen}
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-rex-gold" />
                Filters
                {activeFilterCount > 0 ? (
                  <span className="bg-rex-ink px-1.5 py-0.5 text-[10px] text-white">
                    {activeFilterCount}
                  </span>
                ) : null}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition ${filtersOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        ) : null}

        <div
          className={`col-span-2 grid grid-cols-2 gap-2 lg:col-span-4 lg:contents ${
            isPage && !filtersOpen ? "hidden lg:contents" : ""
          }`}
        >
          <div className={cell}>
            <label className={label}>Area</label>
            <select
              className={control}
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">All</option>
              {areas.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className={cell}>
            <label className={label}>Beds</label>
            <select
              className={control}
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>

          <div className={cell}>
            <label className={label}>Max rent</label>
            <select
              className={control}
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
            >
              <option value="">No max</option>
              {[1000, 1500, 2000, 2500, 3000, 4000, 5000].map((n) => (
                <option key={n} value={n}>
                  £{n.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className={cell}>
            <label className={label}>Type</label>
            <select
              className={control}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All</option>
              {types.map((value) => (
                <option key={value} value={value}>
                  {typeLabels[value] ?? value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:pr-1">
        <p
          className={`hidden text-xs sm:block ${
            isHero ? "text-white/50" : "text-rex-stone"
          }`}
        >
          Lettings only — search homes to rent across London & Southampton.
        </p>
        <button
          type="submit"
          className="rex-btn-primary w-full justify-center shadow-[0_0_24px_color-mix(in_srgb,var(--rex-gold-bright)_45%,transparent)] sm:w-auto"
        >
          <Search className="h-4 w-4" />
          Search rentals
        </button>
      </div>
    </form>
  );
}
