export type PropertyStatus = "available" | "let-agreed" | "under-offer";
export type PropertyType = "apartment" | "house" | "flat" | "studio" | "maisonette";
export type EnquiryType = "contact" | "viewing" | "landlord" | "tenant" | "valuation";
export type EnquiryStatus = "new" | "read" | "replied";

export interface Property {
  id: string;
  slug: string;
  ref: string;
  address: string;
  area: string;
  city: "London" | "Southampton";
  postcode: string;
  rent: number;
  beds: number;
  baths: number;
  receptions: number;
  type: PropertyType;
  status: PropertyStatus;
  furnished: "furnished" | "unfurnished" | "part-furnished";
  epc: string;
  description: string;
  features: string[];
  images: string[];
  featured?: boolean;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  propertyId?: string;
  propertyRef?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface ValuationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  propertyType: string;
  beds: number;
  preferredDate: string;
  notes: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface PropertyFilters {
  query?: string;
  city?: string;
  postcode?: string;
  minRent?: number;
  maxRent?: number;
  beds?: number;
  type?: string;
  status?: string;
}
