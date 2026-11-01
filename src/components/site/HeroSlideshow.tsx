"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/hero/hero-view.png",
    alt: "Bright apartment with city views",
  },
  {
    src: "/images/hero/hero-kitchen.png",
    alt: "Modern rental kitchen interior",
  },
  {
    src: "/images/hero/hero-bedroom.png",
    alt: "Furnished rental bedroom ready to let",
  },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-rex-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[index].src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.1, ease: "easeInOut" },
            scale: { duration: 6.5, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority={index === 0}
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      {/* Base dim — keeps bright window/sky slides from washing white type */}
      <div className="absolute inset-0 bg-black/35" />
      {/* Text-column scrim — stays dark through the headline area */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, var(--rex-hero-from) 0%, var(--rex-hero-from) 28%, var(--rex-hero-via) 52%, transparent 78%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/40" />
      <div className="rex-grain absolute inset-0 opacity-20" />
    </div>
  );
}
