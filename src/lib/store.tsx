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
import { initialEnquiries, initialValuations } from "@/lib/mock/enquiries";
import { initialProperties } from "@/lib/mock/properties";
import type {
  Enquiry,
  Property,
  ValuationRequest,
} from "@/lib/types";

const STORAGE_KEY = "rex-estate-demo-v1";

interface StoreState {
  properties: Property[];
  enquiries: Enquiry[];
  valuations: ValuationRequest[];
  adminAuthed: boolean;
}

interface StoreContextValue extends StoreState {
  ready: boolean;
  setAdminAuthed: (value: boolean) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, patch: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) => void;
  updateEnquiryStatus: (id: string, status: Enquiry["status"]) => void;
  addValuation: (
    valuation: Omit<ValuationRequest, "id" | "createdAt" | "status">,
  ) => void;
  updateValuationStatus: (
    id: string,
    status: ValuationRequest["status"],
  ) => void;
  getPropertyBySlug: (slug: string) => Property | undefined;
  getPropertyById: (id: string) => Property | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadState(): StoreState {
  if (typeof window === "undefined") {
    return {
      properties: initialProperties,
      enquiries: initialEnquiries,
      valuations: initialValuations,
      adminAuthed: false,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        properties: initialProperties,
        enquiries: initialEnquiries,
        valuations: initialValuations,
        adminAuthed: false,
      };
    }
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      properties: parsed.properties?.length
        ? parsed.properties
        : initialProperties,
      enquiries: parsed.enquiries?.length ? parsed.enquiries : initialEnquiries,
      valuations: parsed.valuations?.length
        ? parsed.valuations
        : initialValuations,
      adminAuthed: Boolean(parsed.adminAuthed),
    };
  } catch {
    return {
      properties: initialProperties,
      enquiries: initialEnquiries,
      valuations: initialValuations,
      adminAuthed: false,
    };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>({
    properties: initialProperties,
    enquiries: initialEnquiries,
    valuations: initialValuations,
    adminAuthed: false,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const setAdminAuthed = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, adminAuthed: value }));
  }, []);

  const addProperty = useCallback((property: Property) => {
    setState((prev) => ({
      ...prev,
      properties: [property, ...prev.properties],
    }));
  }, []);

  const updateProperty = useCallback((id: string, patch: Partial<Property>) => {
    setState((prev) => ({
      ...prev,
      properties: prev.properties.map((p) =>
        p.id === id ? { ...p, ...patch } : p,
      ),
    }));
  }, []);

  const deleteProperty = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      properties: prev.properties.filter((p) => p.id !== id),
    }));
  }, []);

  const addEnquiry = useCallback(
    (enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) => {
      const next: Enquiry = {
        ...enquiry,
        id: `e${Date.now()}`,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        enquiries: [next, ...prev.enquiries],
      }));
    },
    [],
  );

  const updateEnquiryStatus = useCallback(
    (id: string, status: Enquiry["status"]) => {
      setState((prev) => ({
        ...prev,
        enquiries: prev.enquiries.map((e) =>
          e.id === id ? { ...e, status } : e,
        ),
      }));
    },
    [],
  );

  const addValuation = useCallback(
    (valuation: Omit<ValuationRequest, "id" | "createdAt" | "status">) => {
      const next: ValuationRequest = {
        ...valuation,
        id: `v${Date.now()}`,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        valuations: [next, ...prev.valuations],
      }));
    },
    [],
  );

  const updateValuationStatus = useCallback(
    (id: string, status: ValuationRequest["status"]) => {
      setState((prev) => ({
        ...prev,
        valuations: prev.valuations.map((v) =>
          v.id === id ? { ...v, status } : v,
        ),
      }));
    },
    [],
  );

  const getPropertyBySlug = useCallback(
    (slug: string) => state.properties.find((p) => p.slug === slug),
    [state.properties],
  );

  const getPropertyById = useCallback(
    (id: string) => state.properties.find((p) => p.id === id),
    [state.properties],
  );

  const value = useMemo(
    () => ({
      ...state,
      ready,
      setAdminAuthed,
      addProperty,
      updateProperty,
      deleteProperty,
      addEnquiry,
      updateEnquiryStatus,
      addValuation,
      updateValuationStatus,
      getPropertyBySlug,
      getPropertyById,
    }),
    [
      state,
      ready,
      setAdminAuthed,
      addProperty,
      updateProperty,
      deleteProperty,
      addEnquiry,
      updateEnquiryStatus,
      addValuation,
      updateValuationStatus,
      getPropertyBySlug,
      getPropertyById,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
