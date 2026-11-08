/**
 * DISABLED COPY — restore by replacing `layout.tsx` with this file's contents
 * (and renaming the default export file back to layout.tsx) when admin goes live.
 *
 * This file is NOT a Next.js route module (name does not match layout/page).
 */
"use client";

import { FormEvent, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { apiLogin } from "@/lib/client-api";
import { useStore } from "@/lib/store";

export default function AdminLayoutDisabled({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminAuthed, setAdminAuthed, ready, live, refreshLive } = useStore();
  const [email, setEmail] = useState("admin@rexestates.uk");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiLogin(email.trim(), password);
      setAdminAuthed(true);
      await refreshLive();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rex-cream text-sm text-rex-stone">
        Loading admin…
      </div>
    );
  }

  if (!adminAuthed) {
    return (
      <div className="rex-grain flex min-h-screen items-center justify-center bg-rex-black px-4 text-white">
        <div className="w-full max-w-md border border-white/10 bg-rex-charcoal p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-rex-gold">
            Rex Agency
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-[0.12em]">
            Admin Login
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            {live
              ? "Sign in with your admin email and password."
              : "Database not connected yet — demo mode still available below, or add MONGODB_URI to enable live login."}
          </p>

          <form onSubmit={onLogin} className="mt-8 space-y-4">
            <div>
              <label className="rex-label text-white/70" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="rex-input mt-1 border-white/15 bg-black/30 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="rex-label text-white/70"
                htmlFor="admin-password"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="rex-input mt-1 border-white/15 bg-black/30 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={live}
                placeholder={live ? "" : "Optional in demo mode"}
              />
            </div>
            {error ? (
              <p className="text-sm text-red-300" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="rex-btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {!live ? (
            <button
              type="button"
              className="rex-btn-ghost mt-3 w-full"
              onClick={() => setAdminAuthed(true)}
            >
              Continue in demo mode
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f2ee] lg:flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b border-rex-line bg-white px-4 py-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.18em] text-rex-stone">
            Rex Estate Agents · {live ? "Live admin" : "Demo administration"}
          </p>
        </div>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
