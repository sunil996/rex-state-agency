"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState, type CSSProperties } from "react";

const SLIDE_MS = 7000;
const CROSSFADE_S = 1.6;

type HeroSlide = {
  src: string;
  alt: string;
  sharpClass: string;
  blurClass: string;
  backdropOnDesktop?: boolean;
};

const slides: HeroSlide[] = [
  {
    src: "/images/hero/candidate-04-nick-fewings.jpg",
    alt: "Tower of London night",
    sharpClass:
      "object-contain object-center md:object-cover md:object-[center_45%]",
    blurClass: "object-cover object-[center_45%]",
  },
  {
    src: "/images/hero/candidate-07-andrea.jpg",
    alt: "City skyline dusk",
    sharpClass:
      "object-contain object-center md:object-cover md:object-[center_50%]",
    blurClass: "object-cover object-[center_50%]",
  },
  {
    src: "/images/hero/candidate-09-josh-property.jpg",
    alt: "Quality rental property interior",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
  },
  {
    src: "/images/hero/candidate-16-francesca-interior.jpg",
    alt: "Elegant rental home interior",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
  },
  {
    src: "/images/hero/candidate-17-quilia-property.jpg",
    alt: "Property ready to let",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
  },
  {
    src: "/images/hero/candidate-11-lotus-kitchen.jpg",
    alt: "Modern rental kitchen",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
  },
  {
    src: "/images/hero/candidate-12-lotus-bedroom.jpg",
    alt: "Styled rental bedroom",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
  },
  {
    src: "/images/hero/candidate-13-bailey-interior-a.jpg",
    alt: "Contemporary rental interior",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
  },
  {
    src: "/images/hero/candidate-08-lotus-interior.jpg",
    alt: "Modern open-plan rental living space",
    sharpClass:
      "object-contain object-center md:object-cover md:object-[center_45%]",
    blurClass: "object-cover object-[center_45%]",
  },
  {
    src: "/images/hero/candidate-20-artbovich-openplan.jpg",
    alt: "Bright open-plan apartment living and dining space",
    sharpClass:
      "object-contain object-center md:object-cover md:object-center",
    blurClass: "object-cover object-center",
  },
  {
    src: "/images/hero/candidate-21-rdne-dining-view.jpg",
    alt: "Dining table set beside floor-to-ceiling skyline windows",
    sharpClass: "object-contain object-center",
    blurClass: "object-cover object-center",
    backdropOnDesktop: true,
  },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = slides[index];
  const total = slides.length;

  const go = useCallback(
    (nextDir: -1 | 1) => {
      setIndex((current) => (current + nextDir + total) % total);
      setTick((t) => t + 1);
    },
    [total],
  );

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % total);
      setTick((t) => t + 1);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [total, tick, reduceMotion]);

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

      {/*
        Pure opacity crossfade (no blur/filter) — GPU-friendly and buttery.
        Incoming + outgoing overlap via mode="sync".
      */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : CROSSFADE_S,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={false}
            animate={
              reduceMotion
                ? { scale: 1 }
                : { scale: [1, 1.045] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: SLIDE_MS / 1000,
                    ease: "linear",
                    times: [0, 1],
                  }
            }
          >
            <Image
              src={slide.src}
              alt=""
              fill
              aria-hidden
              priority={index <= 1}
              quality={60}
              sizes="100vw"
              className={`scale-125 ${slide.blurClass} blur-2xl brightness-[0.5] saturate-[1.1] ${slide.backdropOnDesktop ? "" : "md:hidden"}`}
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
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/12 md:bg-black/15" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, var(--rex-hero-from) 0%, var(--rex-hero-from) 22%, var(--rex-hero-via) 48%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/22 md:from-black/42 md:via-transparent md:to-black/18" />
      <div className="rex-grain absolute inset-0 opacity-[0.07] md:opacity-[0.09]" />

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 md:left-5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 md:right-5"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-7">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to slide ${i + 1}: ${s.alt}`}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo(i)}
              className="relative h-1 w-8 overflow-hidden rounded-full bg-white/25 transition hover:bg-white/40 md:w-10"
            >
              {active ? (
                <span
                  key={`progress-${tick}-${i}`}
                  className="rex-hero-progress absolute inset-0 bg-rex-gold"
                  style={
                    {
                      "--rex-hero-slide-ms": `${SLIDE_MS}ms`,
                    } as CSSProperties
                  }
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
