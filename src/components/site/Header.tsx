"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

const links = [
  { href: "/properties", label: "Properties to Rent" },
  { href: "/landlords", label: "Landlords" },
  { href: "/tenants", label: "Tenants" },
  { href: "/valuation", label: "Rental Valuation" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const darkHero =
    pathname === "/" ||
    pathname.startsWith("/design-1") ||
    pathname.startsWith("/design-2") ||
    pathname.startsWith("/design-3");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`absolute inset-x-0 top-0 z-50 ${
        darkHero ? "text-white" : "text-rex-ink"
      }`}
    >
      <div
        className={`border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          darkHero
            ? `border-white/12 ${
                scrolled
                  ? "bg-rex-ink/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
                  : "bg-rex-ink/92 backdrop-blur-md md:bg-black/25 md:backdrop-blur-sm"
              }`
            : `border-rex-line bg-rex-cream/95 backdrop-blur ${
                scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : ""
              }`
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-3.5">
          <BrandLogo
            variant={darkHero ? "header-dark" : "header-light"}
            priority
          />

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs uppercase tracking-[0.16em] transition hover:text-rex-gold ${
                  pathname.startsWith(link.href) ? "text-rex-gold" : ""
                }`}
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-rex-gold transition-transform duration-300 ${
                    pathname.startsWith(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SITE_PHONE_HREF}
              className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] ${
                darkHero ? "text-white/80" : "text-rex-stone"
              }`}
            >
              <Phone className="h-3.5 w-3.5 text-rex-gold-bright" strokeWidth={2.25} />
              {SITE_PHONE_DISPLAY}
            </a>
            <Link href="/valuation" className="rex-btn-primary !px-4 !py-2.5">
              Book valuation
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={SITE_PHONE_HREF}
              className="inline-flex min-h-11 min-w-11 items-center justify-center"
              aria-label={`Call ${SITE_PHONE_DISPLAY}`}
            >
              <Phone className="h-5 w-5 text-rex-gold-bright" strokeWidth={2.25} />
            </a>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-rex-line bg-rex-cream text-rex-ink shadow-[0_16px_40px_rgba(0,0,0,0.12)] lg:hidden"
          >
            <nav className="flex flex-col gap-4 px-4 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.16em]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/faqs"
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.16em]"
              >
                FAQs
              </Link>
              <a
                href={SITE_PHONE_HREF}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em]"
              >
                <Phone className="h-4 w-4 text-rex-gold-bright" strokeWidth={2.25} />
                {SITE_PHONE_DISPLAY}
              </a>
              <Link
                href="/valuation"
                onClick={() => setOpen(false)}
                className="rex-btn-primary mt-2"
              >
                Book valuation
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
