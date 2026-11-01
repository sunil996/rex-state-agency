"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Palette, X } from "lucide-react";
import { DESIGNS, useTheme } from "@/lib/theme";

export function DesignSwitcher() {
  const pathname = usePathname();
  const { design: active } = useTheme();
  const [open, setOpen] = useState(true);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] max-w-[calc(100vw-2rem)]">
      {open ? (
        <div className="border border-rex-line bg-rex-surface/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-rex-gold">
                Client preview
              </p>
              <p className="mt-1 text-sm font-medium text-rex-ink">
                Choose a design direction
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-rex-stone hover:text-rex-ink"
              aria-label="Collapse design switcher"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {DESIGNS.map((design) => {
              const isActive = active === design.id;
              return (
                <Link
                  key={design.id}
                  href={design.path}
                  className={`block border px-3 py-3 transition ${
                    isActive
                      ? "border-rex-gold bg-rex-badge"
                      : "border-rex-line hover:border-rex-gold"
                  }`}
                >
                  <div className="mb-2 flex gap-1.5">
                    {design.swatches.map((color) => (
                      <span
                        key={color}
                        className="h-4 w-4 border border-black/10"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-rex-stone">
                    {design.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-rex-ink">
                    {design.name}
                  </p>
                </Link>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-rex-stone">
            Same layout — different colour system. Theme stays while you browse
            other pages.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-rex-black px-4 py-3 text-xs uppercase tracking-[0.16em] text-white shadow-lg"
        >
          <Palette className="h-4 w-4 text-rex-gold" />
          Designs
        </button>
      )}
    </div>
  );
}
