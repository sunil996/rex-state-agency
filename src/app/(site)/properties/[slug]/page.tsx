"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ArrowLeft, ExternalLink, Phone, Share2 } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { ViewingForm } from "@/components/property/ViewingForm";
import { formatRent, statusLabel } from "@/lib/format";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";
import { useStore } from "@/lib/store";

export default function PropertyDetailPage() {
  const params = useParams<{ slug: string }>();
  const { getPropertyBySlug, properties } = useStore();
  const property = getPropertyBySlug(params.slug);

  const similar = useMemo(() => {
    if (!property) return [];
    return properties
      .filter(
        (p) =>
          p.id !== property.id &&
          p.status === "available" &&
          (p.area === property.area ||
            p.city === property.city ||
            Math.abs(p.beds - property.beds) <= 1),
      )
      .slice(0, 3);
  }, [properties, property]);

  if (!property) {
    return (
      <div className="bg-rex-cream px-4 pb-20 pt-32 md:px-6 md:pt-36">
        <div className="mx-auto max-w-3xl border border-rex-line bg-white p-10 text-center">
          <h1 className="font-display text-2xl uppercase tracking-[0.08em]">
            Property not found
          </h1>
          <Link href="/properties" className="rex-btn-primary mt-6 inline-flex">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const mapsQuery = encodeURIComponent(
    `${property.address}, ${property.postcode}, ${property.city}`,
  );
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="bg-rex-cream pt-32 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 pb-28 md:px-6 md:pb-28">
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-rex-stone hover:text-rex-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search results
        </Link>

        <PropertyGallery images={property.images} title={property.address} />

        <div className="mt-8 flex flex-col gap-6 border-b border-rex-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-wide md:text-4xl">
              {property.address}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-rex-stone">
              {property.area} · {property.postcode}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-2xl font-semibold md:text-3xl">
                {formatRent(property.rent)}{" "}
                <span className="text-base font-normal text-rex-stone">
                  per month
                </span>
              </p>
              <span className="bg-rex-badge px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                To Let · {statusLabel(property.status)}
              </span>
            </div>
          </div>
          <div className="hidden w-full flex-col gap-3 sm:flex sm:w-auto sm:flex-row sm:flex-wrap">
            <a href="#enquire" className="rex-btn-outline w-full justify-center sm:w-auto">
              Enquire
            </a>
            <a
              href={SITE_PHONE_HREF}
              className="rex-btn-dark w-full justify-center sm:w-auto"
              aria-label={`Call ${SITE_PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4" />
              {SITE_PHONE_DISPLAY}
            </a>
            <button
              type="button"
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 border border-rex-line px-4 py-3 text-xs uppercase tracking-[0.14em] text-rex-stone sm:w-auto"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: property.address,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-0 border-t border-rex-line">
            {[
              {
                label: "Rooms",
                value: `${property.beds} Bedrooms / ${property.baths} Bathrooms / ${property.receptions} Receptions`,
              },
              { label: "Property type", value: property.type },
              { label: "Furnished", value: property.furnished },
              { label: "EPC", value: property.epc },
              { label: "Reference", value: property.ref },
              { label: "Area", value: `${property.city} · ${property.postcode}` },
            ].map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-b border-rex-line py-4 sm:grid-cols-[160px_1fr]"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-rex-stone">
                  {row.label}
                </p>
                <p className="text-sm capitalize text-rex-ink">{row.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.08em]">
              Description
            </h2>
            <p className="mt-4 leading-relaxed text-rex-stone">
              {property.description}
            </p>
            <h3 className="mt-8 font-display text-lg uppercase tracking-[0.08em]">
              Features
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="border-l-2 border-rex-gold pl-3 text-sm text-rex-ink"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="relative min-h-[320px] overflow-hidden border border-rex-line bg-[#e8ebe6]">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-rex-stone">
                Location
              </p>
              <p className="mt-3 font-display text-xl uppercase tracking-[0.08em]">
                {property.area}
              </p>
              <p className="mt-2 text-sm text-rex-stone">
                {property.postcode} · {property.city}
              </p>
              <div className="mt-6 h-3 w-3 rounded-full bg-rex-ink shadow-[0_0_0_8px_rgba(18,18,18,0.15)]" />
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rex-btn-outline mt-8 inline-flex items-center gap-2"
              >
                Open in Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div id="enquire" className="lg:sticky lg:top-28">
            <ViewingForm
              propertyId={property.id}
              propertyRef={property.ref}
              propertyAddress={property.address}
            />
          </div>
        </div>

        {similar.length > 0 ? (
          <div className="mt-16 border-t border-rex-line pt-14 md:mt-20">
            <p className="text-xs uppercase tracking-[0.2em] text-rex-gold">
              More to consider
            </p>
            <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.08em] md:text-3xl">
              Similar properties
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile sticky conversion bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rex-line bg-white/95 px-4 py-3 backdrop-blur-md sm:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-7xl gap-2">
          <a
            href="#enquire"
            className="rex-btn-outline min-h-11 flex-1 justify-center"
          >
            Enquire
          </a>
          <a
            href={SITE_PHONE_HREF}
            className="rex-btn-dark min-h-11 flex-1 justify-center"
            aria-label={`Call ${SITE_PHONE_DISPLAY}`}
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
