import type { PropertyStatus } from "@/lib/types";

export function formatRent(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function statusLabel(status: PropertyStatus) {
  switch (status) {
    case "available":
      return "Available";
    case "let-agreed":
      return "Let Agreed";
    case "under-offer":
      return "Under Offer";
  }
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
