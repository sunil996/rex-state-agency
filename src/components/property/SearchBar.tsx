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

  const shell =
    variant === "hero"
      ? "border border-white/15 bg-black/50 p-4 backdrop-blur-md md:p-5"
      : "border border-rex-line bg-white p-4 md:p-5";

  const control =
    variant === "hero"
      ? "w-full border border-white/15 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-rex-gold"
      : "rex-input";

  const label =
    variant === "hero"
      ? "mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/55"
      : "rex-label";

  return (
    <form onSubmit={onSubmit} className={shell}>
      <div className="grid gap-3 md:grid-cols-6 md:items-end">
        <div className="md:col-span-2">
          <label className={label}>Location / Postcode</label>
          <input
            className={control}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Clapham or SO14"
          />
        </div>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`text-xs ${variant === "hero" ? "text-white/50" : "text-rex-stone"}`}
        >
          Lettings only — search homes to rent across London & Southampton.
        </p>
        <button type="submit" className="rex-btn-primary">
          <Search className="h-4 w-4" />
          Search rentals
        </button>
      </div>
    </form>
  );
}
