import { Schema, models, model } from "mongoose";

const PropertySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    ref: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, enum: ["London", "Southampton"], required: true },
    postcode: { type: String, required: true },
    rent: { type: Number, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    receptions: { type: Number, default: 1 },
    type: {
      type: String,
      enum: ["apartment", "house", "flat", "studio", "maisonette"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "let-agreed", "under-offer"],
      default: "available",
    },
    furnished: {
      type: String,
      enum: ["furnished", "unfurnished", "part-furnished"],
      default: "unfurnished",
    },
    epc: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export type PropertyDocument = {
  _id: { toString(): string };
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
  type: string;
  status: string;
  furnished: string;
  epc: string;
  description: string;
  features: string[];
  images: string[];
  featured?: boolean;
  createdAt: Date;
};

export const PropertyModel =
  models.Property || model("Property", PropertySchema);
