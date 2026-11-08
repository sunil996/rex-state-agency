"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const SLIDE_MS = 8000;

const slides = [
  {
    src: "/images/hero/candidate-04-nick-fewings.jpg",
    alt: "Tower of London night (Nick Fewings)",
    // Mobile: contain (full scene). Desktop: cover fill. Blur layer fills phone letterbox.
    sharpClass:
      "object-contain object-center md:object-cover md:object-[center_45%]",
    blurClass: "object-cover object-[center_45%]",
    scaleFrom: 1,
    scaleTo: 1.02,
  },
  {
    src: "/images/hero/candidate-07-andrea.jpg",
    alt: "City skyline dusk (Andrea)",
    sharpClass:
      "object-contain object-center md:object-cover md:object-[center_50%]",
    blurClass: "object-cover object-[center_50%]",
    scaleFrom: 1,
    scaleTo: 1.02,
  },
  {
    src: "/images/hero/candidate-03-tower-bridge.jpg",
    alt: "Tower Bridge",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
    scaleFrom: 1,
    scaleTo: 1.02,
  },
  {
    src: "/images/hero/candidate-01-ferris-wheel.jpg",
    alt: "Ferris wheel / riverside",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
    scaleFrom: 1,
    scaleTo: 1.02,
  },
  {
    src: "/images/hero/hero-view.png",
    alt: "Apartment view",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
    scaleFrom: 1,
    scaleTo: 1.04,
  },
  {
    src: "/images/hero/hero-bedroom.png",
    alt: "Bedroom interior",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
    scaleFrom: 1,
    scaleTo: 1.04,
  },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = slides[index];
  const total = slides.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + total) % total);
      setTick((t) => t + 1);
    },
    [total],
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [total, tick]);

  const scaleFrom = reduceMotion || compact ? 1 : slide.scaleFrom;
  const scaleTo = reduceMotion || compact ? 1 : slide.scaleTo;

  return (
    <div className="absolute inset-0 overflow-hidden bg-rex-black">
      <div
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        <Image
          src={slides[(index + 1) % total].src}
          alt=""
          width={32}
          height={32}
          quality={60}
        />
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={slide.src}
          initial={{ opacity: 0, scale: scaleFrom }}
          animate={{ opacity: 1, scale: scaleTo }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.9, ease: "easeInOut" },
            scale: { duration: 7.5, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          {/*
            Mobile dual-layer (stories / Apple Music pattern):
            1) Blurred cover fill — kills blank letterbox bars
            2) Sharp contained photo — full scene, not over-cropped
            Desktop: single sharp cover only
          */}
          <Image
            src={slide.src}
            alt=""
            fill
            aria-hidden
            priority={index <= 1}
            quality={60}
            sizes="100vw"
            className={`scale-125 ${slide.blurClass} blur-2xl brightness-[0.7] saturate-150 md:hidden`}
          />
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index <= 1}
            quality={85}
            sizes="100vw"
            className={slide.sharpClass}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/15 md:bg-black/18" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, var(--rex-hero-from) 0%, var(--rex-hero-from) 22%, var(--rex-hero-via) 48%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25 md:from-black/45 md:via-transparent md:to-black/20" />
      <div className="rex-grain absolute inset-0 opacity-10 md:opacity-12" />

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 md:left-5"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 md:right-5"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:bottom-6">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition ${
              i === index ? "w-5 bg-rex-gold" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 z-20 max-w-[55%] truncate rounded bg-black/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm md:bottom-6 md:right-6">
        {index + 1}/{total} · {slide.alt}
      </div>
    </div>
  );
}
