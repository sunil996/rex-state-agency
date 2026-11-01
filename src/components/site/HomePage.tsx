"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { ArrowRight, KeyRound, MapPin, Search } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SearchBar } from "@/components/property/SearchBar";
import { BrandLogo } from "@/components/site/BrandLogo";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  coverageAreas,
  howItWorksSteps,
  testimonials,
} from "@/lib/mock/site-content";
import { useStore } from "@/lib/store";

const trustItems = [
  "London & Southampton",
  "Lettings & management only",
  "Landlords & tenants",
  "Personal, reliable service",
  "Rental valuations",
  "Viewings & tenancy support",
];

export default function HomePage() {
  const { properties } = useStore();
  const featured = properties.filter((p) => p.featured).slice(0, 3);
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", reduceMotion ? "0%" : "28%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(
    heroProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 1.08],
  );

  const { scrollYProgress: whyProgress } = useScroll({
    target: whyRef,
    offset: ["start end", "end start"],
  });
  const whyImageY = useTransform(
    whyProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden text-white"
      >
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <HeroSlideshow />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:justify-center md:px-6 md:pb-28 md:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-8 md:mb-10">
              <BrandLogo variant="hero" href={null} priority />
            </div>

            <h1 className="font-display text-[2.1rem] font-semibold leading-[1.08] tracking-wide text-shadow-hero md:text-5xl lg:text-[3.4rem]">
              Lettings, made
              <span className="block text-rex-gold-soft">straightforward.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 text-shadow-hero md:text-lg">
              Independent lettings & property management across London and
              Southampton — for landlords and tenants who value a personal
              approach.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/properties" className="rex-btn-primary">
                Search rentals
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/valuation" className="rex-btn-ghost">
                Landlord valuation
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-14 hidden md:block"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/45"
            >
              Scroll to explore
              <span className="inline-block h-10 w-px bg-gradient-to-b from-rex-gold to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Moving trust marquee */}
      <div className="overflow-hidden border-y border-rex-line bg-white py-4">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap px-4 text-[11px] uppercase tracking-[0.22em] text-rex-stone"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 28, ease: "linear", repeat: Infinity }
          }
        >
          {[...trustItems, ...trustItems].map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-10">
              <span className="inline-flex items-center gap-2">
                {i % trustItems.length === 0 ? (
                  <MapPin className="h-3.5 w-3.5 text-rex-gold" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-rex-gold" />
                )}
                {item}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Search */}
      <section className="bg-rex-cream px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rex-gold">
                  01 · Find a home
                </p>
                <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.08em] md:text-3xl">
                  Search properties to rent
                </h2>
              </div>
              <Search className="hidden h-5 w-5 text-rex-gold md:block" />
            </div>
          </Reveal>
          <Reveal delay={0.1} direction="scale">
            <div className="border border-rex-line bg-white p-1 shadow-[0_20px_60px_-40px_rgba(15,15,15,0.45)]">
              <SearchBar variant="page" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Path split */}
      <section className="bg-rex-cream px-4 pb-20 md:px-6 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8 md:mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-rex-gold">
              02 · Choose your path
            </p>
            <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.08em] md:text-3xl">
              How can we help today?
            </h2>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            <Reveal direction="left">
              <Link
                href="/properties"
                className="group relative block min-h-[280px] overflow-hidden bg-rex-ink text-white md:min-h-[380px]"
              >
                <Image
                  src="/images/hero/hero-bedroom.png"
                  alt=""
                  fill
                  className="object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-rex-gold transition duration-500 group-hover:scale-y-100" />
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-7 md:min-h-[380px] md:p-10">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-rex-gold">
                    For tenants
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] md:text-4xl">
                    I want to rent
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-white/70">
                    Browse available homes, book viewings and move in with clear
                    support.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-rex-gold transition group-hover:gap-3">
                    Browse rentals <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal direction="right" delay={0.08}>
              <Link
                href="/landlords"
                className="group relative block min-h-[280px] overflow-hidden bg-rex-charcoal text-white md:min-h-[380px]"
              >
                <Image
                  src="/images/hero/hero-kitchen.png"
                  alt=""
                  fill
                  className="object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-rex-gold transition duration-500 group-hover:scale-y-100" />
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-7 md:min-h-[380px] md:p-10">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-rex-gold">
                    For landlords
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] md:text-4xl">
                    I’m a landlord
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-white/70">
                    Marketing, tenants, rent collection and management — handled
                    professionally.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-rex-gold transition group-hover:gap-3">
                    Landlord services <KeyRound className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-rex-line bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              number="03"
              title="How it works"
              subtitle="A clear path whether you’re letting a property or looking for your next home."
            />
          </Reveal>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            {howItWorksSteps.map((group) => (
              <Reveal key={group.who}>
                <p className="text-[10px] uppercase tracking-[0.24em] text-rex-gold">
                  For {group.who.toLowerCase()}
                </p>
                <ol className="mt-6 space-y-0 border-t border-rex-line">
                  {group.steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rex-line py-5 md:grid-cols-[4rem_1fr] md:gap-6"
                    >
                      <span className="font-display text-2xl text-rex-gold/80 md:text-3xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-rex-stone">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="relative overflow-hidden border-t border-rex-line bg-rex-cream px-4 py-20 md:px-6 md:py-28">
        <div className="pointer-events-none absolute -right-20 top-20 font-display text-[8rem] leading-none text-rex-line/40 md:text-[12rem]">
          04
        </div>
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              number="04"
              title="Featured Properties"
              subtitle="Homes currently available to rent across London and Southampton."
            />
          </Reveal>
          <RevealGroup className="grid gap-10 md:grid-cols-3">
            {featured.map((property) => (
              <RevealItem key={property.id}>
                <PropertyCard property={property} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.15} className="mt-12">
            <Link href="/properties" className="rex-btn-outline">
              View all rentals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Areas */}
      <section className="border-t border-rex-line bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              number="05"
              title="Areas we cover"
              subtitle="Independent lettings across key London and Southampton neighbourhoods."
            />
          </Reveal>
          <RevealGroup className="grid gap-x-10 gap-y-0 border-t border-rex-line sm:grid-cols-2 lg:grid-cols-4">
            {coverageAreas.map((area) => (
              <RevealItem key={area.name}>
                <Link
                  href={`/properties?q=${encodeURIComponent(area.name)}`}
                  className="group flex items-baseline justify-between gap-3 border-b border-rex-line py-5 transition"
                >
                  <span>
                    <span className="block font-display text-base uppercase tracking-[0.06em] text-rex-ink transition group-hover:text-rex-gold">
                      {area.name}
                    </span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-rex-stone">
                      {area.city}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-rex-gold opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Services rhythm strip */}
      <section className="bg-rex-cream px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-rex-gold">
              06 · What we handle
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 border-t border-rex-line pt-8 md:grid-cols-4">
            {[
              ["Marketing", "Portals, photos & listing presentation"],
              ["Tenants", "Sourcing, viewings & referencing"],
              ["Rent", "Collection & clear reporting"],
              ["Support", "Maintenance coordination ongoing"],
            ].map(([title, body]) => (
              <RevealItem key={title}>
                <p className="font-display text-lg uppercase tracking-[0.08em]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-rex-stone">
                  {body}
                </p>
                <div className="mt-5 h-px w-10 bg-rex-gold" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-rex-line bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              number="07"
              title="What clients say"
              subtitle="Sample feedback for presentation — illustrating the service tone landlords and tenants can expect."
            />
          </Reveal>
          <RevealGroup className="grid gap-10 md:grid-cols-3 md:gap-12">
            {testimonials.map((item) => (
              <RevealItem key={item.name}>
                <blockquote className="border-l-2 border-rex-gold pl-5">
                  <p className="text-base leading-relaxed text-rex-ink md:text-[1.05rem]">
                    “{item.quote}”
                  </p>
                  <footer className="mt-5">
                    <p className="text-sm font-medium text-rex-ink">{item.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-rex-stone">
                      {item.role}
                    </p>
                  </footer>
                </blockquote>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why Rex */}
      <section
        ref={whyRef}
        className="rex-grain relative overflow-hidden bg-rex-black px-4 py-24 text-white md:px-6 md:py-32"
      >
        <motion.div
          style={{ y: whyImageY }}
          className="absolute inset-y-[-10%] right-0 hidden w-[46%] md:block"
        >
          <Image
            src="/images/hero/hero-view.png"
            alt=""
            fill
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-rex-black/40 to-rex-black" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              number="08"
              title="Why Rex"
              light
              subtitle="Making the rental experience better for landlords and tenants alike."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Clear communication. Reliable management. A personal approach
              across London and Southampton — lettings only, done properly.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-3">
            <Link href="/valuation" className="rex-btn-primary">
              Book a rental valuation
            </Link>
            <Link href="/about" className="rex-btn-ghost">
              Our story
            </Link>
            <Link href="/contact" className="rex-btn-ghost">
              Contact
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
