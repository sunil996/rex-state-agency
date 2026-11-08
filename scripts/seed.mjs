/**
 * Seed MongoDB with properties + ensure admin user exists.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed.mjs
 */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const PropertySchema = new mongoose.Schema(
  {
    slug: String,
    ref: String,
    address: String,
    area: String,
    city: String,
    postcode: String,
    rent: Number,
    beds: Number,
    baths: Number,
    receptions: Number,
    type: String,
    status: String,
    furnished: String,
    epc: String,
    description: String,
    features: [String],
    images: [String],
    featured: Boolean,
  },
  { timestamps: true },
);

const AdminSchema = new mongoose.Schema(
  {
    email: String,
    passwordHash: String,
    name: String,
  },
  { timestamps: true },
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);
const AdminUser =
  mongoose.models.AdminUser || mongoose.model("AdminUser", AdminSchema);

const studioLondonGallery = [
  "/images/properties/studio-london/02-bedroom-wide.jpg",
  "/images/properties/studio-london/01-exterior.jpg",
  "/images/properties/studio-london/03-bedroom-bed.jpg",
  "/images/properties/studio-london/04-bedroom-detail.jpg",
  "/images/properties/studio-london/05-bedroom-seating.jpg",
  "/images/properties/studio-london/06-bedroom-corner.jpg",
  "/images/properties/studio-london/08-kitchen-full.jpg",
  "/images/properties/studio-london/07-kitchen-main.jpg",
  "/images/properties/studio-london/09-kitchenette.jpg",
  "/images/properties/studio-london/10-bathroom-vanity.jpg",
  "/images/properties/studio-london/11-bathroom-shower.jpg",
  "/images/properties/studio-london/12-detail-bedside.jpg",
  "/images/properties/studio-london/13-detail-nightstand.jpg",
];

const properties = [
  {
    slug: "modern-furnished-studio-london",
    ref: "REX2001",
    address: "Modern Furnished Studio, London",
    area: "Greater London",
    city: "London",
    postcode: "Available on enquiry",
    rent: 1650,
    beds: 1,
    baths: 1,
    receptions: 1,
    type: "studio",
    status: "available",
    furnished: "furnished",
    epc: "C",
    description:
      "A bright, fully furnished studio apartment finished to a high standard — ideal for a professional seeking a move-in-ready London rental.",
    features: [
      "Fully furnished & staged",
      "Modern fitted kitchen",
      "Rainfall shower bathroom",
      "Boutique interiors",
      "Ready to move in",
      "Lettings managed by Rex",
    ],
    images: studioLondonGallery,
    featured: true,
  },
  {
    slug: "park-lane-ub4",
    ref: "REX1001",
    address: "Park Lane, UB4",
    area: "Hayes & Southall",
    city: "London",
    postcode: "UB4 8AA",
    rent: 2800,
    beds: 3,
    baths: 2,
    receptions: 1,
    type: "apartment",
    status: "available",
    furnished: "furnished",
    epc: "C",
    description:
      "A beautifully presented three-bedroom apartment in Hayes, offering bright living space, a modern kitchen and well-proportioned bedrooms.",
    features: [
      "Furnished throughout",
      "Modern fitted kitchen",
      "Private balcony",
      "Close to local amenities",
    ],
    images: [
      "/images/properties/bedroom-1.jpg",
      "/images/properties/kitchen-1.jpg",
      "/images/properties/bathroom-1.jpg",
      "/images/properties/city-view.jpg",
    ],
    featured: true,
  },
  {
    slug: "ocean-view-southampton-so14",
    ref: "REX1002",
    address: "Ocean Village, SO14",
    area: "Southampton City Centre",
    city: "Southampton",
    postcode: "SO14 3JP",
    rent: 1650,
    beds: 2,
    baths: 2,
    receptions: 1,
    type: "apartment",
    status: "available",
    furnished: "part-furnished",
    epc: "B",
    description:
      "Contemporary two-bedroom apartment overlooking Ocean Village.",
    features: ["Waterfront location", "Allocated parking", "Concierge"],
    images: [
      "/images/properties/bedroom-2.jpg",
      "/images/properties/kitchen-2.jpg",
      "/images/properties/bathroom-2.jpg",
      "/images/properties/bedroom-3.jpg",
    ],
    featured: true,
  },
];

async function main() {
  await mongoose.connect(uri);
  console.log("Connected");

  const email = (process.env.ADMIN_EMAIL || "admin@rexestates.uk").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMeStrong123!";
  const existingAdmin = await AdminUser.findOne({ email });
  if (!existingAdmin) {
    await AdminUser.create({
      email,
      passwordHash: await bcrypt.hash(password, 10),
      name: "Rex Admin",
    });
    console.log("Admin created:", email);
  } else {
    console.log("Admin already exists:", email);
  }

  await Property.deleteMany({});
  for (const p of properties) {
    await Property.create(p);
  }
  console.log(`Seeded ${properties.length} properties`);

  await mongoose.disconnect();
  console.log("Done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
