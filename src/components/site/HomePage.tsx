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
  const featured = (
    properties.filter((p) => p.featured).length
      ? properties.filter((p) => p.featured)
      : properties.filter((p) => p.status === "available")
  ).slice(0, 3);
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", reduceMotion ? "0%" : "8%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.15]);

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

      {/* Hero — mobile: image band + copy below; desktop: full-bleed overlay */}
      <section
        ref={heroRef}
        className="relative flex flex-col bg-rex-ink pt-14 text-white sm:pt-16 md:block md:min-h-[92svh] md:overflow-hidden md:pt-0 lg:min-h-[100svh]"
      >
        <motion.div
          style={{ y: heroY }}
          className="relative aspect-[5/4] w-full shrink-0 overflow-hidden will-change-transform sm:aspect-[16/11] md:absolute md:inset-0 md:aspect-auto md:h-full md:min-h-[92svh] lg:min-h-[100svh]"
        >
          <HeroSlideshow />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 bg-rex-ink px-4 pb-8 pt-7 md:pointer-events-none md:absolute md:inset-0 md:bg-transparent md:px-0 md:pb-0 md:pt-0"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.14,
                  delayChildren: reduceMotion ? 0 : 0.2,
                },
              },
            }}
            className="pointer-events-auto mx-auto w-full max-w-7xl md:absolute md:bottom-10 md:left-8 md:mx-0 md:max-w-xl lg:bottom-12 lg:left-10 lg:max-w-2xl"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="font-display text-[2.15rem] font-semibold leading-[1.06] tracking-wide md:text-5xl md:text-shadow-hero lg:text-[3.25rem]"
            >
              Lettings, made
              <span className="block text-rex-gold-soft">straightforward.</span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/80 sm:text-base md:mt-5 md:text-lg md:text-white/90 md:text-shadow-hero"
            >
              Independent lettings & property management across London and
              Southampton — for landlords and tenants who value a personal
              approach.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8"
            >
              <Link href="/properties" className="rex-btn-primary w-full justify-center sm:w-auto">
                Search rentals
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/valuation" className="rex-btn-ghost w-full justify-center sm:w-auto">
                Landlord valuation
              </Link>
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
      <section className="bg-rex-cream px-4 pb-16 md:px-6 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-6 md:mb-10">
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
                className="group relative flex min-h-[360px] overflow-hidden bg-rex-ink text-white outline-none transition-[transform,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-rex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-rex-cream sm:min-h-[400px] md:min-h-[440px]"
              >
                <Image
                  src="/images/landloards/vitaly-gariev-QpRjfYmGtbk-unsplash.jpg"
                  alt="Couple with house keys after moving into a new home"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_28%] transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Type scrim — strong only where copy sits */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_38%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0.08)_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black/35 to-transparent"
                />
                <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-rex-gold transition duration-500 group-hover:scale-y-100" />
                <div className="relative mt-auto flex w-full flex-col justify-end p-6 sm:p-8 md:p-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-rex-gold-soft">
                    For tenants
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.65rem] uppercase leading-[1.05] tracking-[0.06em] text-white sm:text-3xl md:text-4xl">
                    I want to rent
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-white/90">
                    Browse available homes, book viewings and move in with clear
                    support.
                  </p>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 border-b border-rex-gold pb-1.5 text-[11px] uppercase tracking-[0.2em] text-white transition-[gap,color,border-color] duration-300 group-hover:gap-3 group-hover:border-rex-gold-soft group-hover:text-rex-gold-soft">
                    Browse rentals <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal direction="right" delay={0.08}>
              <Link
                href="/landlords"
                className="group relative flex min-h-[360px] overflow-hidden bg-rex-charcoal text-white outline-none transition-[transform,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-rex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-rex-cream sm:min-h-[400px] md:min-h-[440px]"
              >
                <Image
                  src="/images/landloards/Gemini_Generated_Image_2am5km2am5km2am5.png"
                  alt="Professional landlord services illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0.2)_65%,rgba(0,0,0,0.1)_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black/30 to-transparent"
                />
                <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-rex-gold transition duration-500 group-hover:scale-y-100" />
                <div className="relative mt-auto flex w-full flex-col justify-end p-6 sm:p-8 md:p-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-rex-gold-soft">
                    For landlords
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.65rem] uppercase leading-[1.05] tracking-[0.06em] text-white sm:text-3xl md:text-4xl">
                    I’m a landlord
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-white/90">
                    Marketing, tenants, rent collection and management — handled
                    professionally.
                  </p>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 border-b border-rex-gold pb-1.5 text-[11px] uppercase tracking-[0.2em] text-white transition-[gap,color,border-color] duration-300 group-hover:gap-3 group-hover:border-rex-gold-soft group-hover:text-rex-gold-soft">
                    Landlord services <KeyRound className="h-3.5 w-3.5" />
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
          <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                  href={`/properties?area=${encodeURIComponent(area.name)}`}
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
          <RevealGroup className="mt-8 grid gap-6 border-t border-rex-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Why Rex — light band so it doesn't read as a second footer */}
      <section
        ref={whyRef}
        className="relative overflow-hidden border-t border-rex-line bg-rex-cream px-4 py-20 md:px-6 md:py-28"
      >
        <motion.div
          style={{ y: whyImageY }}
          className="absolute inset-y-[-10%] right-0 hidden w-[42%] md:block"
        >
          <Image
            src="/images/hero/hero-view.png"
            alt=""
            fill
            sizes="42vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-rex-cream/50 to-rex-cream" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              number="08"
              title="Why Rex"
              subtitle="Making the rental experience better for landlords and tenants alike."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-rex-stone md:text-lg">
              Clear communication. Reliable management. A personal approach
              across London and Southampton — lettings only, done properly.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-3">
            <Link href="/valuation" className="rex-btn-primary">
              Book a rental valuation
            </Link>
            <Link href="/about" className="rex-btn-outline">
              Our story
            </Link>
            <Link href="/contact" className="rex-btn-outline">
              Contact
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
