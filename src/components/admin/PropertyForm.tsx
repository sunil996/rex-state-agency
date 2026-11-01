"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import type { Property, PropertyStatus, PropertyType } from "@/lib/types";

const libraryImages = [
  "/images/properties/bedroom-1.jpg",
  "/images/properties/bedroom-2.jpg",
  "/images/properties/bedroom-3.jpg",
  "/images/properties/kitchen-1.jpg",
  "/images/properties/kitchen-2.jpg",
  "/images/properties/bathroom-1.jpg",
  "/images/properties/bathroom-2.jpg",
  "/images/properties/city-view.jpg",
];

interface PropertyFormProps {
  initial?: Property;
  onSubmit: (values: Omit<Property, "id" | "createdAt"> & { id?: string }) => void;
  submitLabel?: string;
}

export function PropertyForm({
  initial,
  onSubmit,
  submitLabel = "Save property",
}: PropertyFormProps) {
  const [images, setImages] = useState<string[]>(
    initial?.images ?? [libraryImages[0]],
  );
  const [featuresText, setFeaturesText] = useState(
    (initial?.features ?? []).join("\n"),
  );

  function toggleLibraryImage(src: string) {
    setImages((prev) =>
      prev.includes(src) ? prev.filter((i) => i !== src) : [...prev, src],
    );
  }

  function onUpload(files: FileList | null) {
    if (!files?.length) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, url]);
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = String(data.get("address") || "");
    const postcode = String(data.get("postcode") || "");
    const slugBase = `${address}-${postcode}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    onSubmit({
      id: initial?.id,
      slug: initial?.slug ?? slugBase,
      ref: String(data.get("ref") || ""),
      address,
      area: String(data.get("area") || ""),
      city: String(data.get("city") || "London") as Property["city"],
      postcode,
      rent: Number(data.get("rent") || 0),
      beds: Number(data.get("beds") || 0),
      baths: Number(data.get("baths") || 0),
      receptions: Number(data.get("receptions") || 1),
      type: String(data.get("type") || "apartment") as PropertyType,
      status: String(data.get("status") || "available") as PropertyStatus,
      furnished: String(
        data.get("furnished") || "unfurnished",
      ) as Property["furnished"],
      epc: String(data.get("epc") || "C"),
      description: String(data.get("description") || ""),
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      images: images.length ? images : [libraryImages[0]],
      featured: Boolean(data.get("featured")),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="rex-label" htmlFor="address">
            Address / title
          </label>
          <input
            id="address"
            name="address"
            required
            defaultValue={initial?.address}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="area">
            Area
          </label>
          <input
            id="area"
            name="area"
            required
            defaultValue={initial?.area}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="postcode">
            Postcode
          </label>
          <input
            id="postcode"
            name="postcode"
            required
            defaultValue={initial?.postcode}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="city">
            City
          </label>
          <select
            id="city"
            name="city"
            defaultValue={initial?.city ?? "London"}
            className="rex-input"
          >
            <option value="London">London</option>
            <option value="Southampton">Southampton</option>
          </select>
        </div>
        <div>
          <label className="rex-label" htmlFor="ref">
            Reference
          </label>
          <input
            id="ref"
            name="ref"
            required
            defaultValue={initial?.ref ?? `REX${Date.now().toString().slice(-4)}`}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="rent">
            Rent (£ pcm)
          </label>
          <input
            id="rent"
            name="rent"
            type="number"
            required
            defaultValue={initial?.rent ?? 1500}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="beds">
            Bedrooms
          </label>
          <input
            id="beds"
            name="beds"
            type="number"
            required
            defaultValue={initial?.beds ?? 2}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="baths">
            Bathrooms
          </label>
          <input
            id="baths"
            name="baths"
            type="number"
            required
            defaultValue={initial?.baths ?? 1}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="receptions">
            Receptions
          </label>
          <input
            id="receptions"
            name="receptions"
            type="number"
            defaultValue={initial?.receptions ?? 1}
            className="rex-input"
          />
        </div>
        <div>
          <label className="rex-label" htmlFor="type">
            Property type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={initial?.type ?? "apartment"}
            className="rex-input"
          >
            <option value="apartment">Apartment</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
            <option value="maisonette">Maisonette</option>
            <option value="studio">Studio</option>
          </select>
        </div>
        <div>
          <label className="rex-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initial?.status ?? "available"}
            className="rex-input"
          >
            <option value="available">Available</option>
            <option value="let-agreed">Let Agreed</option>
            <option value="under-offer">Under Offer</option>
          </select>
        </div>
        <div>
          <label className="rex-label" htmlFor="furnished">
            Furnished
          </label>
          <select
            id="furnished"
            name="furnished"
            defaultValue={initial?.furnished ?? "unfurnished"}
            className="rex-input"
          >
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
            <option value="part-furnished">Part-furnished</option>
          </select>
        </div>
        <div>
          <label className="rex-label" htmlFor="epc">
            EPC
          </label>
          <input
            id="epc"
            name="epc"
            defaultValue={initial?.epc ?? "C"}
            className="rex-input"
          />
        </div>
      </div>

      <div>
        <label className="rex-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={initial?.description}
          className="rex-input"
        />
      </div>

      <div>
        <label className="rex-label" htmlFor="features">
          Features (one per line)
        </label>
        <textarea
          id="features"
          rows={5}
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          className="rex-input"
        />
      </div>

      <div>
        <p className="rex-label">Photos</p>
        <div className="mb-4 flex flex-wrap gap-3">
          {images.map((src) => (
            <div key={src} className="relative h-24 w-32 overflow-hidden border border-rex-line">
              <Image src={src} alt="" fill className="object-cover" unoptimized={src.startsWith("blob:")} />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((i) => i !== src))}
                className="absolute right-1 top-1 bg-black/70 p-1 text-white"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onUpload(e.target.files)}
          className="mb-4 block w-full text-sm text-rex-stone"
        />
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-rex-stone">
          Or pick from demo library
        </p>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
          {libraryImages.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => toggleLibraryImage(src)}
              className={`relative aspect-square overflow-hidden border ${
                images.includes(src) ? "border-rex-gold" : "border-rex-line"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-rex-ink">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={initial?.featured}
          className="accent-rex-gold"
        />
        Feature on homepage
      </label>

      <button type="submit" className="rex-btn-dark">
        {submitLabel}
      </button>
    </form>
  );
}
