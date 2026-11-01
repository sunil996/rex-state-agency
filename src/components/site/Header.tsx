"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";

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
  const darkHero =
    pathname === "/" ||
    pathname.startsWith("/design-1") ||
    pathname.startsWith("/design-2") ||
    pathname.startsWith("/design-3");

  return (
    <header
      className={`absolute inset-x-0 top-8 z-50 md:top-9 ${
        darkHero ? "text-white" : "text-rex-ink"
      }`}
    >
      <div
        className={`border-b ${
          darkHero
            ? "border-white/10 bg-black/20 backdrop-blur-sm"
            : "border-rex-line bg-rex-cream/95 backdrop-blur"
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
                className={`text-xs uppercase tracking-[0.16em] transition hover:text-rex-gold ${
                  pathname.startsWith(link.href) ? "text-rex-gold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+442000000000"
              className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] ${
                darkHero ? "text-white/80" : "text-rex-stone"
              }`}
            >
              <Phone className="h-3.5 w-3.5 text-rex-gold" />
              020 0000 0000
            </a>
            <Link href="/valuation" className="rex-btn-primary !px-4 !py-2.5">
              Book valuation
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-b border-rex-line bg-rex-cream px-4 py-6 text-rex-ink lg:hidden">
          <nav className="flex flex-col gap-4">
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
            <Link
              href="/valuation"
              onClick={() => setOpen(false)}
              className="rex-btn-primary mt-2"
            >
              Book valuation
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
