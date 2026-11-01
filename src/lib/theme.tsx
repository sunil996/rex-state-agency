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

function designFromPath(pathname: string): DesignId | null {
  if (pathname === "/" || pathname === "") return "current";
  if (pathname.startsWith("/design-1")) return "design-1";
  if (pathname.startsWith("/design-2")) return "design-2";
  if (pathname.startsWith("/design-3")) return "design-3";
  return null;
}

function applyDesign(id: DesignId) {
  document.documentElement.setAttribute("data-design", id);
}

interface ThemeContextValue {
  design: DesignId;
  setDesign: (id: DesignId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [design, setDesignState] = useState<DesignId>("current");

  useEffect(() => {
    const fromPath = designFromPath(pathname);
    if (fromPath) {
      setDesignState(fromPath);
      applyDesign(fromPath);
      localStorage.setItem(STORAGE_KEY, fromPath);
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY) as DesignId | null;
    const next =
      saved && DESIGNS.some((d) => d.id === saved) ? saved : "current";
    setDesignState(next);
    applyDesign(next);
  }, [pathname]);

  const setDesign = useCallback((id: DesignId) => {
    setDesignState(id);
    applyDesign(id);
    localStorage.setItem(STORAGE_KEY, id);
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
