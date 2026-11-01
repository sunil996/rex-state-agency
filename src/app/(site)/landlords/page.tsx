import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  Hammer,
  Megaphone,
  MessagesSquare,
  PiggyBank,
  UserSearch,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Landlord Services",
  description:
    "Tenant sourcing, marketing, referencing, rent collection and property management for landlords in London and Southampton.",
};

const services = [
  {
    icon: Megaphone,
    title: "Property marketing",
    body: "Professional photography guidance, portal exposure and listing presentation designed to attract the right tenants quickly.",
  },
  {
    icon: UserSearch,
    title: "Tenant sourcing",
    body: "We find suitable applicants, arrange viewings and keep you informed at every stage of the letting process.",
  },
  {
    icon: ClipboardCheck,
    title: "Referencing",
    body: "Thorough credit, employment and landlord referencing so you can let with confidence.",
  },
  {
    icon: PiggyBank,
    title: "Rent collection",
    body: "Structured rent collection and clear reporting to help keep your income predictable.",
  },
  {
    icon: MessagesSquare,
    title: "Tenancy administration",
    body: "Agreements, compliance support and day-to-day tenancy administration handled with care.",
  },
  {
    icon: Hammer,
    title: "Maintenance coordination",
    body: "We coordinate repairs and maintenance with trusted contacts, keeping tenants and landlords updated.",
  },
];

export default function LandlordsPage() {
  return (
    <div className="bg-rex-cream pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <SectionHeading
          number="01"
          title="Landlord Services"
          subtitle="Helping landlords let and manage their properties with reliable service, clear communication and a personal approach."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="border border-rex-line bg-white p-7"
              >
                <Icon className="mb-4 h-6 w-6 text-rex-gold" />
                <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-rex-stone">
                  {service.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col gap-4 border border-rex-line bg-rex-ink p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-[0.08em]">
              Ready to let with Rex?
            </h2>
            <p className="mt-2 text-white/70">
              Request a rental valuation or speak to our team about management
              options.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/valuation" className="rex-btn-primary">
              Rental valuation
            </Link>
            <Link href="/contact" className="rex-btn-ghost">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
