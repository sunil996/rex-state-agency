import { Schema, models, model } from "mongoose";

const EnquirySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["contact", "viewing", "landlord", "tenant", "valuation"],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    propertyId: { type: String, default: "" },
    propertyRef: { type: String, default: "" },
    preferredDate: { type: String, default: "" },
    preferredTime: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const EnquiryModel = models.Enquiry || model("Enquiry", EnquirySchema);
