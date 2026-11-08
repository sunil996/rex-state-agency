import { Schema, models, model } from "mongoose";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Rex Admin" },
  },
  { timestamps: true },
);

export const AdminUserModel =
  models.AdminUser || model("AdminUser", AdminUserSchema);
