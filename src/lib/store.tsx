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
import {
  apiCreateEnquiry,
  apiCreateProperty,
  apiCreateValuation,
  apiDeleteProperty,
  apiGetEnquiries,
  apiGetProperties,
  apiGetValuations,
  apiMe,
  apiUpdateEnquiryStatus,
  apiUpdateProperty,
  apiUpdateValuationStatus,
} from "@/lib/client-api";
import { initialEnquiries, initialValuations } from "@/lib/mock/enquiries";
import { initialProperties } from "@/lib/mock/properties";
import type {
  Enquiry,
  Property,
  ValuationRequest,
} from "@/lib/types";

interface StoreState {
  properties: Property[];
  enquiries: Enquiry[];
  valuations: ValuationRequest[];
  adminAuthed: boolean;
  live: boolean;
}

interface StoreContextValue extends StoreState {
  ready: boolean;
  setAdminAuthed: (value: boolean) => void;
  refreshLive: () => Promise<void>;
  addProperty: (property: Property) => Promise<void>;
  updateProperty: (id: string, patch: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  addEnquiry: (
    enquiry: Omit<Enquiry, "id" | "createdAt" | "status">,
  ) => Promise<void>;
  updateEnquiryStatus: (id: string, status: Enquiry["status"]) => Promise<void>;
  addValuation: (
    valuation: Omit<ValuationRequest, "id" | "createdAt" | "status">,
  ) => Promise<void>;
  updateValuationStatus: (
    id: string,
    status: ValuationRequest["status"],
  ) => Promise<void>;
  getPropertyBySlug: (slug: string) => Property | undefined;
  getPropertyById: (id: string) => Property | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>({
    properties: initialProperties,
    enquiries: initialEnquiries,
    valuations: initialValuations,
    adminAuthed: false,
    live: false,
  });
  const [ready, setReady] = useState(false);

  const refreshLive = useCallback(async () => {
    try {
      const { properties } = await apiGetProperties();
      setState((prev) => ({
        ...prev,
        properties,
        live: true,
      }));

      const me = await apiMe();
      if (me?.user) {
        setState((prev) => ({ ...prev, adminAuthed: true }));
        try {
          const [{ enquiries }, { valuations }] = await Promise.all([
            apiGetEnquiries(),
            apiGetValuations(),
          ]);
          setState((prev) => ({ ...prev, enquiries, valuations }));
        } catch {
          // Admin session may be missing scopes during first boot
        }
      }
    } catch {
      setState((prev) => ({
        ...prev,
        live: false,
        properties: initialProperties,
        enquiries: initialEnquiries,
        valuations: initialValuations,
      }));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refreshLive();
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshLive]);

  const setAdminAuthed = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, adminAuthed: value }));
  }, []);

  const addProperty = useCallback(
    async (property: Property) => {
      if (state.live) {
        const { property: created } = await apiCreateProperty(property);
        setState((prev) => ({
          ...prev,
          properties: [created, ...prev.properties],
        }));
        return;
      }
      setState((prev) => ({
        ...prev,
        properties: [property, ...prev.properties],
      }));
    },
    [state.live],
  );

  const updateProperty = useCallback(
    async (id: string, patch: Partial<Property>) => {
      if (state.live) {
        const { property } = await apiUpdateProperty(id, patch);
        setState((prev) => ({
          ...prev,
          properties: prev.properties.map((p) => (p.id === id ? property : p)),
        }));
        return;
      }
      setState((prev) => ({
        ...prev,
        properties: prev.properties.map((p) =>
          p.id === id ? { ...p, ...patch } : p,
        ),
      }));
    },
    [state.live],
  );

  const deleteProperty = useCallback(
    async (id: string) => {
      if (state.live) {
        await apiDeleteProperty(id);
      }
      setState((prev) => ({
        ...prev,
        properties: prev.properties.filter((p) => p.id !== id),
      }));
    },
    [state.live],
  );

  const addEnquiry = useCallback(
    async (enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) => {
      if (state.live) {
        const { enquiry: created } = await apiCreateEnquiry(enquiry);
        setState((prev) => ({
          ...prev,
          enquiries: [created, ...prev.enquiries],
        }));
        return;
      }
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
    [state.live],
  );

  const updateEnquiryStatus = useCallback(
    async (id: string, status: Enquiry["status"]) => {
      if (state.live) {
        const { enquiry } = await apiUpdateEnquiryStatus(id, status);
        setState((prev) => ({
          ...prev,
          enquiries: prev.enquiries.map((e) => (e.id === id ? enquiry : e)),
        }));
        return;
      }
      setState((prev) => ({
        ...prev,
        enquiries: prev.enquiries.map((e) =>
          e.id === id ? { ...e, status } : e,
        ),
      }));
    },
    [state.live],
  );

  const addValuation = useCallback(
    async (
      valuation: Omit<ValuationRequest, "id" | "createdAt" | "status">,
    ) => {
      if (state.live) {
        const { valuation: created } = await apiCreateValuation(valuation);
        setState((prev) => ({
          ...prev,
          valuations: [created, ...prev.valuations],
        }));
        return;
      }
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
    [state.live],
  );

  const updateValuationStatus = useCallback(
    async (id: string, status: ValuationRequest["status"]) => {
      if (state.live) {
        const { valuation } = await apiUpdateValuationStatus(id, status);
        setState((prev) => ({
          ...prev,
          valuations: prev.valuations.map((v) => (v.id === id ? valuation : v)),
        }));
        return;
      }
      setState((prev) => ({
        ...prev,
        valuations: prev.valuations.map((v) =>
          v.id === id ? { ...v, status } : v,
        ),
      }));
    },
    [state.live],
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
      refreshLive,
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
      refreshLive,
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
