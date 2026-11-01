"use client";

import { FormEvent, useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Toast } from "@/components/ui/Toast";
import { useStore } from "@/lib/store";

export default function ContactPage() {
  const { addEnquiry } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = String(data.get("subject") || "General enquiry");
    addEnquiry({
      type:
        subject === "Landlord enquiry"
          ? "landlord"
          : subject === "Tenant enquiry"
            ? "tenant"
            : "contact",
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      subject,
      message: String(data.get("message") || ""),
    });
    e.currentTarget.reset();
    setToast("Enquiry sent. It will appear in the agency admin inbox.");
  }

  return (
    <div className="bg-rex-cream pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28">
        <SectionHeading
          number="01"
          title="Contact Us"
          subtitle="Speak to the Rex team about lettings, management or finding your next rental home."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="border border-rex-line bg-white p-6">
              <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                London
              </h3>
              <p className="mt-3 flex gap-2 text-sm text-rex-stone">
                <MapPin className="mt-0.5 h-4 w-4 text-rex-gold" />
                Address placeholder — confirm with client
              </p>
            </div>
            <div className="border border-rex-line bg-white p-6">
              <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                Southampton
              </h3>
              <p className="mt-3 flex gap-2 text-sm text-rex-stone">
                <MapPin className="mt-0.5 h-4 w-4 text-rex-gold" />
                Address placeholder — confirm with client
              </p>
            </div>
            <div className="space-y-3 text-sm text-rex-stone">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rex-gold" />
                <a href="tel:+442000000000" className="hover:text-rex-ink">
                  020 0000 0000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-rex-gold" />
                <a
                  href="mailto:enquiries@rexestateagents.co.uk"
                  className="hover:text-rex-ink"
                >
                  enquiries@rexestateagents.co.uk
                </a>
              </p>
            </div>
            <div className="flex gap-3">
              <a href="#" className="border border-rex-line p-2 hover:border-rex-gold" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="border border-rex-line p-2 hover:border-rex-gold" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="border border-rex-line p-2 hover:border-rex-gold" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4 border border-rex-line bg-white p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="rex-label" htmlFor="name">
                  Name
                </label>
                <input id="name" name="name" required className="rex-input" />
              </div>
              <div>
                <label className="rex-label" htmlFor="phone">
                  Phone
                </label>
                <input id="phone" name="phone" required className="rex-input" />
              </div>
            </div>
            <div>
              <label className="rex-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rex-input"
              />
            </div>
            <div>
              <label className="rex-label" htmlFor="subject">
                Subject
              </label>
              <select id="subject" name="subject" className="rex-input">
                <option>General enquiry</option>
                <option>Landlord enquiry</option>
                <option>Tenant enquiry</option>
                <option>Viewing follow-up</option>
              </select>
            </div>
            <div>
              <label className="rex-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="rex-input"
              />
            </div>
            <button type="submit" className="rex-btn-dark w-full">
              Send enquiry
            </button>
          </form>
        </div>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
