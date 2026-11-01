import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Rex Estate Agents is an independent lettings and property management company operating in London and Southampton.",
};

export default function AboutPage() {
  return (
    <div className="bg-rex-cream pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <SectionHeading
          number="01"
          title="About Rex Estate Agents"
          subtitle="Independent lettings and property management for landlords and tenants across London and Southampton."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/properties/bedroom-2.jpg"
              alt="Professionally presented rental home"
              fill
              className="object-cover"
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
