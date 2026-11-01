"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Phone, Share2 } from "lucide-react";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { ViewingForm } from "@/components/property/ViewingForm";
import { formatRent, statusLabel } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function PropertyDetailPage() {
  const params = useParams<{ slug: string }>();
  const { getPropertyBySlug } = useStore();
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    return (
      <div className="bg-rex-cream px-4 pb-20 pt-32 md:px-6">
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

  return (
    <div className="bg-rex-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
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
          <div className="flex flex-wrap gap-3">
            <a href="#enquire" className="rex-btn-outline">
              Enquire
            </a>
            <a href="tel:+442000000000" className="rex-btn-dark">
              <Phone className="h-4 w-4" />
              020 0000 0000
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 border border-rex-line px-4 py-3 text-xs uppercase tracking-[0.14em] text-rex-stone"
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

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[320px] overflow-hidden border border-rex-line bg-[#e8ebe6]">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-rex-stone">
                Location map
              </p>
              <p className="mt-3 font-display text-xl uppercase tracking-[0.08em]">
                {property.area}
              </p>
              <p className="mt-2 text-sm text-rex-stone">
                {property.postcode} · Map placeholder for presentation UI
              </p>
              <div className="mt-6 h-3 w-3 rounded-full bg-rex-ink shadow-[0_0_0_8px_rgba(18,18,18,0.15)]" />
            </div>
          </div>
          <div id="enquire">
            <ViewingForm
              propertyId={property.id}
              propertyRef={property.ref}
              propertyAddress={property.address}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
