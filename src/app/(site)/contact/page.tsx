"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Toast } from "@/components/ui/Toast";
import { FORMSPREE, submitFormspree } from "@/lib/formspree";
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "@/lib/site";

export default function ContactPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = String(data.get("subject") || "General enquiry");

    try {
      await submitFormspree(FORMSPREE.contact, {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        subject,
        message: String(data.get("message") || ""),
        _subject: `Rex Contact — ${subject}`,
      });
      form.reset();
      setToast("Enquiry sent. We’ll get back to you shortly.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send enquiry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-rex-cream pt-32 md:pt-36">
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
              <p className="mt-2 text-sm text-rex-stone">
                Lettings &amp; property management
              </p>
            </div>
            <div className="border border-rex-line bg-white p-6">
              <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                Southampton
              </h3>
              <p className="mt-2 text-sm text-rex-stone">
                Lettings &amp; property management
              </p>
            </div>
            <div className="space-y-3 text-sm text-rex-stone">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rex-gold" />
                <a href={SITE_PHONE_HREF} className="hover:text-rex-ink">
                  {SITE_PHONE_DISPLAY}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-rex-gold" />
                <a href={SITE_EMAIL_HREF} className="hover:text-rex-ink">
                  {SITE_EMAIL}
                </a>
              </p>
            </div>
            <SocialLinks variant="light" />
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
            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="rex-btn-dark w-full"
              disabled={loading}
            >
              {loading ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        </div>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
