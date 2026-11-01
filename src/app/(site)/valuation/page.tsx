"use client";

import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Toast } from "@/components/ui/Toast";
import { useStore } from "@/lib/store";

export default function ValuationPage() {
  const { addValuation } = useStore();
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    addValuation({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      address: String(data.get("address") || ""),
      postcode: String(data.get("postcode") || ""),
      propertyType: String(data.get("propertyType") || ""),
      beds: Number(data.get("beds") || 0),
      preferredDate: String(data.get("preferredDate") || ""),
      notes: String(data.get("notes") || ""),
    });
    setSuccess(true);
    setToast("Valuation request received. We'll be in touch to confirm.");
    e.currentTarget.reset();
  }

  return (
    <div className="bg-rex-cream pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 md:grid-cols-[0.9fr_1.1fr] md:px-6 md:pb-28">
        <div>
          <SectionHeading
            number="01"
            title="Rental Valuation"
            subtitle="Request an estimate of achievable rental income and select a preferred date for your valuation."
          />
          <p className="text-sm leading-relaxed text-rex-stone">
            Rex Estate Agents provides lettings-focused valuations for landlords
            in London and Southampton. No buying or selling — just clear advice
            on rent and next steps to let your property.
          </p>
        </div>

        <div className="border border-rex-line bg-white p-6 md:p-8">
          {success ? (
            <div className="py-10 text-center">
              <p className="font-display text-2xl uppercase tracking-[0.08em]">
                Request sent
              </p>
              <p className="mt-3 text-rex-stone">
                Thank you. Your valuation request is now in our admin inbox for
                follow-up.
              </p>
              <button
                type="button"
                className="rex-btn-outline mt-8"
                onClick={() => setSuccess(false)}
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="rex-label" htmlFor="name">
                    Full name
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
                <label className="rex-label" htmlFor="address">
                  Property address
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  className="rex-input"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="rex-label" htmlFor="postcode">
                    Postcode
                  </label>
                  <input
                    id="postcode"
                    name="postcode"
                    required
                    className="rex-input"
                  />
                </div>
                <div>
                  <label className="rex-label" htmlFor="propertyType">
                    Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    className="rex-input"
                  >
                    <option value="">Select</option>
                    <option value="apartment">Apartment</option>
                    <option value="flat">Flat</option>
                    <option value="house">House</option>
                    <option value="maisonette">Maisonette</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
                <div>
                  <label className="rex-label" htmlFor="beds">
                    Bedrooms
                  </label>
                  <select id="beds" name="beds" required className="rex-input">
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="rex-label" htmlFor="preferredDate">
                  Preferred valuation date
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  required
                  className="rex-input"
                />
              </div>
              <div>
                <label className="rex-label" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="rex-input"
                  placeholder="Current tenancy status, management interest, etc."
                />
              </div>
              <button type="submit" className="rex-btn-dark w-full">
                Request valuation
              </button>
            </form>
          )}
        </div>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
