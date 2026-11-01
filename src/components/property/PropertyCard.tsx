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
      className="group block border-b border-rex-ink/80 pb-6 transition hover:border-rex-gold"
    >
      <div className="relative mb-5 aspect-[16/11] overflow-hidden bg-rex-charcoal">
        <Image
          src={property.images[0]}
          alt={property.address}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-3 bg-rex-badge px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-rex-ink">
          {statusLabel(property.status)}
        </span>
      </div>
      <h3 className="font-display text-base font-semibold uppercase tracking-[0.06em] text-rex-ink md:text-lg">
        {property.address}
      </h3>
      <p className="mt-1 text-sm uppercase tracking-[0.12em] text-rex-stone">
        {property.area}
      </p>
      <p className="mt-3 text-xl font-semibold text-rex-ink md:text-2xl">
        {formatRent(property.rent)}{" "}
        <span className="text-sm font-normal text-rex-stone">per month</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-rex-stone">
        {property.beds} Bed <span className="mx-1 text-rex-line">|</span>{" "}
        {property.baths} Bath <span className="mx-1 text-rex-line">|</span> Ref:{" "}
        {property.ref}
      </p>
      <div className="mt-5 h-px w-full bg-rex-ink transition group-hover:h-1 group-hover:bg-rex-gold" />
    </Link>
  );
}
