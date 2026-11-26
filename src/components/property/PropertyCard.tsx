"use client";

import Image from "next/image";
import Link from "next/link";
import { formatRent, statusLabel } from "@/lib/format";
import type { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-rex-surface ring-1 ring-rex-line shadow-(--rex-shadow-sm) transition duration-300 hover:-translate-y-1 hover:shadow-(--rex-shadow-lg) hover:ring-rex-gold/40"
    >
      <div className="relative aspect-[16/11] shrink-0 overflow-hidden bg-rex-charcoal">
        <Image
          src={property.images[0]}
          alt={property.address}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-rex-badge/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-rex-ink backdrop-blur-sm">
          {statusLabel(property.status)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[2.6em] break-words font-display text-base font-semibold uppercase leading-[1.3] tracking-[0.06em] text-rex-ink md:min-h-[2.7em] md:text-lg">
          {property.address}
        </h3>
        <p className="mt-1 line-clamp-1 min-h-[1.25rem] text-sm uppercase tracking-[0.12em] text-rex-stone">
          {property.area}
        </p>
        <p className="mt-3 text-xl font-semibold text-rex-ink md:text-2xl">
          {formatRent(property.rent)}{" "}
          <span className="text-sm font-normal text-rex-stone">per month</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-rex-stone">
          {property.beds} Bed <span className="mx-1 text-rex-line">|</span>{" "}
          {property.baths} Bath <span className="mx-1 text-rex-line">|</span>{" "}
          Ref: {property.ref}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-rex-gold transition-[gap] duration-300 group-hover:gap-2.5">
          View home <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
