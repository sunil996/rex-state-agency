"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = images.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (total < 2) return;
      setIndex((current) => (current + dir + total) % total);
    },
    [total],
  );

  const openAt = (absoluteIndex: number) => {
    setLightbox(absoluteIndex);
  };

  const shiftLightbox = useCallback(
    (dir: -1 | 1) => {
      if (lightbox === null || total < 2) return;
      setLightbox((current) => ((current ?? 0) + dir + total) % total);
    },
    [lightbox, total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox !== null) {
        if (e.key === "ArrowLeft") shiftLightbox(-1);
        if (e.key === "ArrowRight") shiftLightbox(1);
        if (e.key === "Escape") setLightbox(null);
        return;
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, lightbox, shiftLightbox]);

  if (!total) return null;

  const mainAbs = index;
  const sideOneAbs = (index + 1) % total;
  const sideTwoAbs = total > 2 ? (index + 2) % total : sideOneAbs;
  const mainSrc = images[mainAbs];
  const sideOne = images[sideOneAbs];
  const sideTwo = images[sideTwoAbs];

  return (
    <>
      {/* Charters-style mosaic: flush tiles, no letterbox gaps */}
      <div className="relative">
        <div className="grid grid-cols-1 gap-[2px] bg-white md:grid-cols-[1.65fr_1fr] md:grid-rows-[1fr_1fr] md:h-[min(68vh,560px)]">
          {/* Main hero — spans full height on desktop */}
          <button
            type="button"
            onClick={() => openAt(mainAbs)}
            className="relative col-span-1 aspect-[16/10] overflow-hidden bg-rex-charcoal md:row-span-2 md:aspect-auto md:h-full"
          >
            <Image
              key={`main-${mainSrc}-${mainAbs}`}
              src={mainSrc}
              alt={`${title} — photo ${mainAbs + 1}`}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
            />
          </button>

          {/* Top-right tile */}
          <button
            type="button"
            onClick={() => openAt(sideOneAbs)}
            className="relative hidden overflow-hidden bg-rex-charcoal md:block md:h-full"
          >
            <Image
              key={`side1-${sideOne}-${sideOneAbs}`}
              src={sideOne}
              alt={`${title} — photo ${sideOneAbs + 1}`}
              fill
              className="object-cover object-center"
              sizes="35vw"
            />
          </button>

          {/* Bottom-right tile */}
          <button
            type="button"
            onClick={() => openAt(sideTwoAbs)}
            className="relative hidden overflow-hidden bg-rex-charcoal md:block md:h-full"
          >
            <Image
              key={`side2-${sideTwo}-${sideTwoAbs}`}
              src={sideTwo}
              alt={`${title} — photo ${sideTwoAbs + 1}`}
              fill
              className="object-cover object-center"
              sizes="35vw"
            />
          </button>
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] transition hover:scale-110 md:left-3 md:h-14 md:w-14"
            >
              <ChevronLeft className="h-9 w-9 stroke-[1.25] md:h-11 md:w-11" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] transition hover:scale-110 md:right-3 md:top-[25%] md:h-14 md:w-14"
            >
              <ChevronRight className="h-9 w-9 stroke-[1.25] md:h-11 md:w-11" />
            </button>
            <button
              type="button"
              onClick={() => openAt(mainAbs)}
              className="absolute bottom-3 right-3 z-10 bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-rex-ink shadow-sm transition hover:bg-rex-gold md:bottom-4 md:right-4"
            >
              View all {total} photos
            </button>
          </>
        ) : null}
      </div>

      {lightbox !== null ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 p-4">
          <button
            type="button"
            className="absolute right-4 top-4 text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            className="absolute left-3 text-white drop-shadow md:left-8"
            onClick={() => shiftLightbox(-1)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-10 w-10 stroke-[1.25]" />
          </button>
          <div className="relative h-[78vh] w-full max-w-6xl">
            <Image
              src={images[lightbox]}
              alt={`${title} — gallery ${lightbox + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <button
            type="button"
            className="absolute right-3 text-white drop-shadow md:right-8"
            onClick={() => shiftLightbox(1)}
            aria-label="Next"
          >
            <ChevronRight className="h-10 w-10 stroke-[1.25]" />
          </button>
          <p className="absolute bottom-6 text-xs uppercase tracking-[0.18em] text-white/70">
            {lightbox + 1} / {total}
          </p>
        </div>
      ) : null}
    </>
  );
}
