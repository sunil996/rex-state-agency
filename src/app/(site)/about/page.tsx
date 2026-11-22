import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutTestimonials } from "@/lib/mock/site-content";
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Rex Estate Agents is an independent lettings and property management company operating in London and Southampton.",
};

export default function AboutPage() {
  return (
    <div className="bg-rex-cream pt-32 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <SectionHeading
          number="01"
          title="About Rex Estate Agents"
          subtitle="Independent lettings and property management for landlords and tenants across London and Southampton."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="/images/about/Gemini_Generated_Image_msl2j7msl2j7msl2.png"
              alt="House keys and notebook on a desk overlooking a London street — lettings ready to hand over"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_65%]"
              priority
            />
          </div>
          <div className="space-y-5 text-rex-stone leading-relaxed">
            <p>
              Rex Estate Agents is an independent lettings and property
              management company. We work with both landlords and tenants —
              helping landlords let and manage their properties while supporting
              tenants in finding the right homes to suit their needs.
            </p>
            <p>
              Our services include property marketing, tenant sourcing and
              referencing, rent collection, tenancy management, maintenance
              coordination and ongoing support for landlords and tenants.
            </p>
            <p>
              Our aim is to make renting and property management
              straightforward, stress-free and professional. We believe in
              building long-term relationships through reliable service, clear
              communication and a personal approach.
            </p>
            <p className="border-l-2 border-rex-gold pl-4 text-rex-ink">
              Our focus: making the rental experience better for landlords and
              tenants alike.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Values",
              body: "Reliability, clarity and care in every letting and management relationship.",
            },
            {
              title: "Approach",
              body: "Personal service with professional standards — never one-size-fits-all.",
            },
            {
              title: "Areas",
              body: "London and Southampton — lettings and property management only.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-rex-line bg-white p-7">
              <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-rex-stone">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-rex-line pt-12 md:mt-20 md:pt-16">
          <SectionHeading
            number="02"
            title="Working with us"
            subtitle="You’ll deal with a small lettings team — clear contact points, no call-centre runaround."
          />
          <div className="grid gap-10 border-t border-rex-line pt-8 md:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-rex-gold">
                Coverage
              </p>
              <p className="mt-3 font-display text-xl uppercase tracking-[0.06em]">
                London &amp; Southampton
              </p>
              <p className="mt-2 text-sm leading-relaxed text-rex-stone">
                Lettings and property management only — focused on the areas we
                know well.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-rex-gold">
                Speak to us
              </p>
              <p className="mt-3 text-sm leading-relaxed text-rex-ink">
                <a href={SITE_PHONE_HREF} className="hover:text-rex-gold">
                  {SITE_PHONE_DISPLAY}
                </a>
                <br />
                <a href={SITE_EMAIL_HREF} className="hover:text-rex-gold">
                  {SITE_EMAIL}
                </a>
              </p>
              <p className="mt-2 text-sm text-rex-stone">
                Mon–Fri 9:00–18:00 · Sat by appointment
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-rex-gold">
                Next step
              </p>
              <p className="mt-3 text-sm leading-relaxed text-rex-stone">
                Landlords can book a rental valuation; tenants can browse
                available homes and request a viewing online.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-rex-line pt-12 md:mt-20 md:pt-16">
          <SectionHeading
            number="03"
            title="Trusted relationships"
            subtitle="How clients describe working with a small lettings team — personal contact, clear updates, no call-centre runaround."
            className="mb-7 md:mb-9"
          />
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {aboutTestimonials.map((item) => (
              <blockquote
                key={item.name}
                className="h-full rounded-xl border-l-2 border-rex-gold bg-rex-surface p-6 ring-1 ring-rex-line shadow-(--rex-shadow-sm) transition duration-300 hover:-translate-y-0.5 hover:shadow-(--rex-shadow-md)"
              >
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
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/valuation" className="rex-btn-dark">
            Book a valuation
          </Link>
          <Link href="/contact" className="rex-btn-outline">
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
