import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, FileCheck2, Home, LifeBuoy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Tenant Services",
  description:
    "Find suitable rental homes, arrange viewings, complete applications and get support throughout your tenancy with Rex Estate Agents.",
};

const steps = [
  {
    icon: Home,
    title: "Find the right home",
    body: "Browse curated lettings across London and Southampton with clear pricing, photos and key details.",
  },
  {
    icon: CalendarCheck,
    title: "Arrange viewings",
    body: "Request a viewing online with your preferred date and time — we confirm and guide you through.",
  },
  {
    icon: FileCheck2,
    title: "Complete applications",
    body: "A straightforward application and referencing process with clear expectations at every step.",
  },
  {
    icon: LifeBuoy,
    title: "Supported tenancy",
    body: "Ongoing help with maintenance coordination and tenancy questions after you move in.",
  },
];

export default function TenantsPage() {
  return (
    <div className="bg-rex-cream pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <SectionHeading
          number="01"
          title="Tenant Services"
          subtitle="We help tenants find homes that suit their needs — and support them from first viewing through to a settled tenancy."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="border border-rex-line bg-white p-8"
              >
                <p className="text-xs tracking-[0.2em] text-rex-gold">
                  0{index + 1}
                </p>
                <Icon className="mt-4 h-6 w-6 text-rex-ink" />
                <h3 className="mt-4 font-display text-xl uppercase tracking-[0.08em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-rex-stone">
                  {step.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/properties" className="rex-btn-dark">
            Browse rentals
          </Link>
          <Link href="/contact" className="rex-btn-outline">
            Tenant enquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
