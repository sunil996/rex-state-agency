"use client";

import { FormEvent, useState } from "react";
import { Toast } from "@/components/ui/Toast";
import { FORMSPREE, submitFormspree } from "@/lib/formspree";

interface ViewingFormProps {
  propertyId: string;
  propertyRef: string;
  propertyAddress: string;
}

export function ViewingForm({
  propertyId,
  propertyRef,
  propertyAddress,
}: ViewingFormProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = String(
      data.get("message") || `Viewing request for ${propertyAddress}`,
    );

    try {
      await submitFormspree(FORMSPREE.viewing, {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        preferredDate: String(data.get("date") || ""),
        preferredTime: String(data.get("time") || ""),
        propertyId,
        propertyRef,
        propertyAddress,
        message,
        _subject: `Rex Viewing — ${propertyRef} · ${propertyAddress}`,
      });
      form.reset();
      setToast("Viewing request sent. Our team will confirm shortly.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4 border border-rex-line bg-white p-5 sm:p-6">
        <h3 className="font-display text-lg uppercase tracking-[0.08em]">
          Book a viewing
        </h3>
        <div>
          <label className="rex-label" htmlFor="name">
            Full name
          </label>
          <input id="name" name="name" required className="rex-input" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
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
          <div className="min-w-0">
            <label className="rex-label" htmlFor="phone">
              Phone
            </label>
            <input id="phone" name="phone" required className="rex-input" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label className="rex-label" htmlFor="date">
              Preferred date
            </label>
            <input id="date" name="date" type="date" required className="rex-input" />
          </div>
          <div className="min-w-0">
            <label className="rex-label" htmlFor="time">
              Preferred time
            </label>
            <input id="time" name="time" type="time" required className="rex-input" />
          </div>
        </div>
        <div>
          <label className="rex-label" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="rex-input"
            placeholder="Any notes for the viewing..."
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
          {loading ? "Sending…" : "Request viewing"}
        </button>
      </form>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </>
  );
}
