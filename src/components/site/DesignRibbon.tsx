"use client";

import { DESIGNS, useTheme } from "@/lib/theme";

export function DesignRibbon() {
  const { design } = useTheme();
  const meta = DESIGNS.find((d) => d.id === design) ?? DESIGNS[0];

  return (
    <div className="design-ribbon" aria-live="polite">
      <span className="swatch" />
      Viewing: {meta.label} — {meta.name}
    </div>
  );
}
