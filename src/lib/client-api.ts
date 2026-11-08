import type { Enquiry, Property, ValuationRequest } from "@/lib/types";

async function parse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error || `Request failed (${res.status})`,
    );
  }
  return data as T;
}

export async function apiGetProperties(params?: Record<string, string>) {
  const qs = params ? `?${new URLSearchParams(params)}` : "";
  const res = await fetch(`/api/properties${qs}`, { cache: "no-store" });
  return parse<{ properties: Property[] }>(res);
}

export async function apiCreateProperty(property: Partial<Property>) {
  const res = await fetch("/api/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
  });
  return parse<{ property: Property }>(res);
}

export async function apiUpdateProperty(id: string, patch: Partial<Property>) {
  const res = await fetch(`/api/properties/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return parse<{ property: Property }>(res);
}

export async function apiDeleteProperty(id: string) {
  const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
  return parse<{ ok: boolean }>(res);
}

export async function apiCreateEnquiry(
  enquiry: Omit<Enquiry, "id" | "createdAt" | "status">,
) {
  const res = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enquiry),
  });
  return parse<{ enquiry: Enquiry }>(res);
}

export async function apiGetEnquiries() {
  const res = await fetch("/api/enquiries", { cache: "no-store" });
  return parse<{ enquiries: Enquiry[] }>(res);
}

export async function apiUpdateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
) {
  const res = await fetch(`/api/enquiries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return parse<{ enquiry: Enquiry }>(res);
}

export async function apiCreateValuation(
  valuation: Omit<ValuationRequest, "id" | "createdAt" | "status">,
) {
  const res = await fetch("/api/valuations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(valuation),
  });
  return parse<{ valuation: ValuationRequest }>(res);
}

export async function apiGetValuations() {
  const res = await fetch("/api/valuations", { cache: "no-store" });
  return parse<{ valuations: ValuationRequest[] }>(res);
}

export async function apiUpdateValuationStatus(
  id: string,
  status: ValuationRequest["status"],
) {
  const res = await fetch(`/api/valuations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return parse<{ valuation: ValuationRequest }>(res);
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parse<{ ok: boolean; user: { email: string; name: string } }>(res);
}

export async function apiLogout() {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  return parse<{ ok: boolean }>(res);
}

export async function apiMe() {
  const res = await fetch("/api/auth/me", { cache: "no-store" });
  if (res.status === 401) return null;
  return parse<{ user: { id: string; email: string; name: string } }>(res);
}
