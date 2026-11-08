import type { Enquiry, Property, ValuationRequest } from "@/lib/types";

function asId(doc: { _id?: { toString(): string }; id?: string }) {
  return doc.id || doc._id?.toString() || "";
}

export function serializeProperty(doc: Record<string, unknown>): Property {
  const createdAt = doc.createdAt
    ? new Date(doc.createdAt as string | Date).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return {
    id: asId(doc as { _id?: { toString(): string }; id?: string }),
    slug: String(doc.slug || ""),
    ref: String(doc.ref || ""),
    address: String(doc.address || ""),
    area: String(doc.area || ""),
    city: (doc.city === "Southampton" ? "Southampton" : "London") as Property["city"],
    postcode: String(doc.postcode || ""),
    rent: Number(doc.rent || 0),
    beds: Number(doc.beds || 0),
    baths: Number(doc.baths || 0),
    receptions: Number(doc.receptions || 0),
    type: doc.type as Property["type"],
    status: doc.status as Property["status"],
    furnished: doc.furnished as Property["furnished"],
    epc: String(doc.epc || ""),
    description: String(doc.description || ""),
    features: Array.isArray(doc.features) ? (doc.features as string[]) : [],
    images: Array.isArray(doc.images) ? (doc.images as string[]) : [],
    featured: Boolean(doc.featured),
    createdAt,
  };
}

export function serializeEnquiry(doc: Record<string, unknown>): Enquiry {
  return {
    id: asId(doc as { _id?: { toString(): string }; id?: string }),
    type: doc.type as Enquiry["type"],
    name: String(doc.name || ""),
    email: String(doc.email || ""),
    phone: String(doc.phone || ""),
    subject: doc.subject ? String(doc.subject) : undefined,
    message: String(doc.message || ""),
    propertyId: doc.propertyId ? String(doc.propertyId) : undefined,
    propertyRef: doc.propertyRef ? String(doc.propertyRef) : undefined,
    preferredDate: doc.preferredDate ? String(doc.preferredDate) : undefined,
    preferredTime: doc.preferredTime ? String(doc.preferredTime) : undefined,
    status: (doc.status as Enquiry["status"]) || "new",
    createdAt: doc.createdAt
      ? new Date(doc.createdAt as string | Date).toISOString()
      : new Date().toISOString(),
  };
}

export function serializeValuation(
  doc: Record<string, unknown>,
): ValuationRequest {
  return {
    id: asId(doc as { _id?: { toString(): string }; id?: string }),
    name: String(doc.name || ""),
    email: String(doc.email || ""),
    phone: String(doc.phone || ""),
    address: String(doc.address || ""),
    postcode: String(doc.postcode || ""),
    propertyType: String(doc.propertyType || ""),
    beds: Number(doc.beds || 0),
    preferredDate: String(doc.preferredDate || ""),
    notes: String(doc.notes || ""),
    status: (doc.status as ValuationRequest["status"]) || "new",
    createdAt: doc.createdAt
      ? new Date(doc.createdAt as string | Date).toISOString()
      : new Date().toISOString(),
  };
}
