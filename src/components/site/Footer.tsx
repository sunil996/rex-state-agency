import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { SocialLinks } from "@/components/site/SocialLinks";
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="rex-grain bg-rex-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:gap-12 md:px-6 md:py-16 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          {/* Mobile: text brand only — PNG has a black plate that looks like a misplaced box */}
          <Link
            href="/"
            className="mb-4 inline-flex flex-col md:mb-5 md:hidden"
            aria-label="Rex Estate Agents home"
          >
            <span className="font-display text-xl font-semibold tracking-[0.14em] text-rex-gold">
              REX
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-white/55">
              Estate Agents
            </span>
          </Link>
          <div className="mb-5 hidden md:block">
            <BrandLogo variant="footer" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            Independent lettings and property management across London and
            Southampton. Renting, made straightforward.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-rex-gold">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/properties" className="hover:text-rex-gold">
                Properties to Rent
              </Link>
            </li>
            <li>
              <Link href="/landlords" className="hover:text-rex-gold">
                Landlord Services
              </Link>
            </li>
            <li>
              <Link href="/tenants" className="hover:text-rex-gold">
                Tenant Services
              </Link>
            </li>
            <li>
              <Link href="/valuation" className="hover:text-rex-gold">
                Rental Valuation
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-rex-gold">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-rex-gold">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/about" className="hover:text-rex-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-rex-gold">
                Contact
              </Link>
            </li>
            {/* Temporary: admin hidden for static launch
            <li>
              <Link href="/admin" className="hover:text-rex-gold">
                Agency Admin
              </Link>
            </li>
            */}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-rex-gold">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rex-gold" />
              London & Southampton — address TBC
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rex-gold" />
              <a href={SITE_PHONE_HREF} className="hover:text-rex-gold">
                {SITE_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-rex-gold" />
              <a href={SITE_EMAIL_HREF} className="hover:text-rex-gold">
                {SITE_EMAIL}
              </a>
            </li>
          </ul>
          <SocialLinks className="mt-5" variant="dark" />
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs leading-relaxed text-white/40 md:px-6">
        <p>
          © {new Date().getFullYear()} Rex Estate Agents. Lettings & property
          management only.
        </p>
        <p className="mt-1">Demo UI for client presentation.</p>
      </div>
    </footer>
  );
}
