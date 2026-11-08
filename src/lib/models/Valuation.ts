import { Schema, models, model } from "mongoose";

const ValuationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: String, required: true },
    postcode: { type: String, required: true },
    propertyType: { type: String, default: "" },
    beds: { type: Number, default: 0 },
    preferredDate: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const ValuationModel =
  models.Valuation || model("Valuation", ValuationSchema);
