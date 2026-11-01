import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";

export function Footer() {
  return (
    <footer className="rex-grain bg-rex-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <div className="mb-5">
            <BrandLogo variant="footer" />
          </div>
          <p className="text-sm leading-relaxed text-white/65">
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
            <li>
              <Link href="/admin" className="hover:text-rex-gold">
                Agency Admin
              </Link>
            </li>
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
              <a href="tel:+442000000000" className="hover:text-rex-gold">
                020 0000 0000
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-rex-gold" />
              <a
                href="mailto:enquiries@rexestateagents.co.uk"
                className="hover:text-rex-gold"
              >
                enquiries@rexestateagents.co.uk
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="border border-white/15 p-2 text-white/70 hover:border-rex-gold hover:text-rex-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="border border-white/15 p-2 text-white/70 hover:border-rex-gold hover:text-rex-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="border border-white/15 p-2 text-white/70 hover:border-rex-gold hover:text-rex-gold"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40 md:px-6">
        © {new Date().getFullYear()} Rex Estate Agents. Lettings & property
        management only. Demo UI for client presentation.
      </div>
    </footer>
  );
}
