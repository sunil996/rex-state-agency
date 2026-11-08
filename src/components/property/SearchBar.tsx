"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  variant?: "hero" | "page";
  initial?: {
    query?: string;
    city?: string;
    beds?: string;
    maxRent?: string;
    type?: string;
  };
}

export function SearchBar({ variant = "hero", initial }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initial?.query ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [beds, setBeds] = useState(initial?.beds ?? "");
  const [maxRent, setMaxRent] = useState(initial?.maxRent ?? "");
  const [type, setType] = useState(initial?.type ?? "");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (city) params.set("city", city);
    if (beds) params.set("beds", beds);
    if (maxRent) params.set("maxRent", maxRent);
    if (type) params.set("type", type);
    router.push(`/properties?${params.toString()}`);
  }

  const isHero = variant === "hero";

  const shell = isHero
    ? "border border-white/15 bg-black/50 p-3 backdrop-blur-md sm:p-4 md:p-5"
    : "border border-rex-line bg-white p-3 sm:p-4 md:p-5";

  // MakeMyTrip-style bordered cells on mobile; flat controls from lg up
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
        {/* Full-width location — like MMT primary field */}
        <div className={`${cell} col-span-2 lg:col-span-2`}>
          <label className={label}>Location / Postcode</label>
          <input
            className={control}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Clapham or SO14"
          />
        </div>

        {/* Paired row: Area | Beds */}
        <div className={cell}>
          <label className={label}>Area</label>
          <select
            className={control}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All</option>
            <option value="London">London</option>
            <option value="Southampton">Southampton</option>
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

        {/* Paired row: Max rent | Type */}
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
            <option value="apartment">Apartment</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
            <option value="maisonette">Maisonette</option>
            <option value="studio">Studio</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`hidden text-xs sm:block ${
            isHero ? "text-white/50" : "text-rex-stone"
          }`}
        >
          Lettings only — search homes to rent across London & Southampton.
        </p>
        <button
          type="submit"
          className="rex-btn-primary w-full justify-center sm:w-auto"
        >
          <Search className="h-4 w-4" />
          Search rentals
        </button>
      </div>
    </form>
  );
}
