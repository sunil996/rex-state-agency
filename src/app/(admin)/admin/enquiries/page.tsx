"use client";

import { useMemo, useState } from "react";
import { Mail, Reply } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { useStore } from "@/lib/store";
import type { Enquiry } from "@/lib/types";

export default function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus } = useStore();
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [reply, setReply] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...enquiries].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [enquiries],
  );

  function sendReply() {
    if (!selected) return;
    updateEnquiryStatus(selected.id, "replied");
    const mailto = `mailto:${selected.email}?subject=${encodeURIComponent(
      `Re: ${selected.subject || selected.type} — Rex Estate Agents`,
    )}&body=${encodeURIComponent(reply)}`;
    window.open(mailto, "_blank");
    setToast(`Reply prepared for ${selected.name}. Marked as replied.`);
    setReply("");
  }

  return (
    <div>
      <h1 className="font-display text-2xl uppercase tracking-[0.08em]">
        Enquiries Inbox
      </h1>
      <p className="mt-2 text-sm text-rex-stone">
        Contact, viewing, landlord and tenant enquiries from the website.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="border border-rex-line bg-white">
          <ul className="divide-y divide-rex-line">
            {sorted.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(e);
                    if (e.status === "new") updateEnquiryStatus(e.id, "read");
                  }}
                  className={`flex w-full items-start justify-between gap-3 px-5 py-4 text-left transition hover:bg-[#fafaf8] ${
                    selected?.id === e.id ? "bg-[#fafaf8]" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium">{e.name}</p>
                    <p className="mt-1 text-sm capitalize text-rex-stone">
                      {e.type}
                      {e.propertyRef ? ` · ${e.propertyRef}` : ""}
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-rex-stone">
                      {e.message}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] uppercase tracking-[0.14em] ${
                      e.status === "new"
                        ? "bg-rex-gold px-2 py-1 text-rex-ink"
                        : "text-rex-stone"
                    }`}
                  >
                    {e.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-rex-line bg-white p-6">
          {selected ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl uppercase tracking-[0.08em]">
                    {selected.name}
                  </h2>
                  <p className="mt-1 text-sm text-rex-stone">
                    {selected.email} · {selected.phone}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.14em] text-rex-gold">
                  {selected.type}
                </span>
              </div>
              {selected.subject ? (
                <p className="mt-4 text-sm font-medium">{selected.subject}</p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-rex-stone">
                {selected.message}
              </p>
              {(selected.preferredDate || selected.preferredTime) && (
                <p className="mt-4 text-sm text-rex-ink">
                  Preferred: {selected.preferredDate} {selected.preferredTime}
                </p>
              )}
              <div className="mt-6 border-t border-rex-line pt-6">
                <p className="rex-label">Reply via email</p>
                <textarea
                  className="rex-input"
                  rows={5}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply for the demo mail compose…"
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={sendReply}
                    className="rex-btn-dark"
                    disabled={!reply.trim()}
                  >
                    <Reply className="h-4 w-4" />
                    Send reply
                  </button>
                  <a
                    href={`mailto:${selected.email}`}
                    className="rex-btn-outline"
                  >
                    <Mail className="h-4 w-4" />
                    Open mail app
                  </a>
                </div>
              </div>
            </>
          ) : (
            <p className="py-16 text-center text-sm text-rex-stone">
              Select an enquiry to view details and reply.
            </p>
          )}
        </div>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
