"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landlordFaqs, tenantFaqs } from "@/lib/mock/faqs";

export default function FaqsPage() {
  const [tab, setTab] = useState<"landlords" | "tenants">("landlords");
  const [open, setOpen] = useState<number | null>(0);
  const items = tab === "landlords" ? landlordFaqs : tenantFaqs;

  return (
    <div className="bg-rex-cream pt-28 md:pt-32">
      <div className="mx-auto max-w-3xl px-4 pb-20 md:px-6 md:pb-28">
        <SectionHeading
          number="01"
          title="FAQs"
          subtitle="Common questions for landlords and tenants working with Rex Estate Agents."
        />

        <div className="mb-8 flex gap-2">
          {(
            [
              ["landlords", "Landlords"],
              ["tenants", "Tenants"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setTab(key);
                setOpen(0);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] ${
                tab === key
                  ? "bg-rex-ink text-white"
                  : "border border-rex-line text-rex-stone"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="border border-rex-line bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="font-medium text-rex-ink">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-rex-gold transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen ? (
                  <p className="border-t border-rex-line px-5 py-4 text-sm leading-relaxed text-rex-stone">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
