"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type DesignId = "current" | "design-1" | "design-2" | "design-3";

const STORAGE_KEY = "rex-design-preview";

export const DESIGNS: {
  id: DesignId;
  label: string;
  name: string;
  path: string;
  swatches: [string, string, string];
}[] = [
  {
    id: "current",
    label: "Current",
    name: "Rex Gold (current)",
    path: "/",
    swatches: ["#121212", "#C5A46E", "#FAFAF8"],
  },
  {
    id: "design-1",
    label: "Design 1",
    name: "British Editorial",
    path: "/design-1",
    swatches: ["#111111", "#B8956A", "#FFFFFF"],
  },
  {
    id: "design-2",
    label: "Design 2",
    name: "Mayfair Noir",
    path: "/design-2",
    swatches: ["#141414", "#D4AF37", "#1C1C1C"],
  },
  {
    id: "design-3",
    label: "Design 3",
    name: "Harbour Cool",
    path: "/design-3",
    swatches: ["#071820", "#1F7A6C", "#EEF3F6"],
  },
];

// Preview path mapping kept for later if switcher is re-enabled
// function designFromPath(pathname: string): DesignId | null {
//   if (pathname === "/" || pathname === "") return "current";
//   if (pathname.startsWith("/design-1")) return "design-1";
//   if (pathname.startsWith("/design-2")) return "design-2";
//   if (pathname.startsWith("/design-3")) return "design-3";
//   return null;
// }

function applyDesign(id: DesignId) {
  document.documentElement.setAttribute("data-design", id);
}

interface ThemeContextValue {
  design: DesignId;
  setDesign: (id: DesignId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const LOCKED_DESIGN: DesignId = "design-1"; // British Editorial — preview switcher off

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [design, setDesignState] = useState<DesignId>(LOCKED_DESIGN);

  useEffect(() => {
    // Locked to Design 1 — ignore path / localStorage switches for now
    void pathname;
    // const fromPath = designFromPath(pathname);
    // if (fromPath) { ... }
    setDesignState(LOCKED_DESIGN);
    applyDesign(LOCKED_DESIGN);
    localStorage.setItem(STORAGE_KEY, LOCKED_DESIGN);
  }, [pathname]);

  const setDesign = useCallback((_id: DesignId) => {
    // Preview switcher disabled — keep Design 1
    setDesignState(LOCKED_DESIGN);
    applyDesign(LOCKED_DESIGN);
    localStorage.setItem(STORAGE_KEY, LOCKED_DESIGN);
  }, []);

  const value = useMemo(
    () => ({ design, setDesign }),
    [design, setDesign],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
