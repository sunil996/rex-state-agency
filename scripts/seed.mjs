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

const heinzBurtCloseGallery = [
  "/images/properties/heinz-burt-close-eastleigh/01-exterior.png",
  "/images/properties/heinz-burt-close-eastleigh/06-living.jpg",
  "/images/properties/heinz-burt-close-eastleigh/07-dining.jpg",
  "/images/properties/heinz-burt-close-eastleigh/04-kitchen.png",
  "/images/properties/heinz-burt-close-eastleigh/02-bedroom.png",
  "/images/properties/heinz-burt-close-eastleigh/05-bedroom.jpg",
  "/images/properties/heinz-burt-close-eastleigh/10-bedroom.jpg",
  "/images/properties/heinz-burt-close-eastleigh/03-bathroom.png",
  "/images/properties/heinz-burt-close-eastleigh/08-bathroom-skylight.jpg",
  "/images/properties/heinz-burt-close-eastleigh/09-bathroom.jpg",
];

const nicholsRoadGallery = [
  "/images/properties/nichols-road-so14/01-exterior.jpg",
  "/images/properties/nichols-road-so14/02-bedroom-bay.jpg",
  "/images/properties/nichols-road-so14/03-bedroom.jpg",
  "/images/properties/nichols-road-so14/04-bedroom.jpg",
  "/images/properties/nichols-road-so14/05-bathroom.jpg",
  "/images/properties/nichols-road-so14/06-bathroom-wc.jpg",
];

const nicholsRoadTwoGallery = [
  "/images/properties/nichols-road-so14-2/01-hallway.jpg",
  "/images/properties/nichols-road-so14-2/02-hallway-entrance.jpg",
  "/images/properties/nichols-road-so14-2/03-kitchen.jpg",
  "/images/properties/nichols-road-so14-2/04-kitchen-sink.jpg",
  "/images/properties/nichols-road-so14-2/05-kitchen-hob.jpg",
  "/images/properties/nichols-road-so14-2/06-bathroom.jpg",
  "/images/properties/nichols-road-so14-2/07-bathroom-view.jpg",
  "/images/properties/nichols-road-so14-2/08-bedroom.jpg",
];

const properties = [
  {
    slug: "heinz-burt-close-eastleigh",
    ref: "REX2002",
    address: "Heinz Burt Close, Eastleigh",
    area: "Eastleigh",
    city: "Southampton",
    postcode: "SO50",
    rent: 2450,
    beds: 5,
    baths: 3,
    receptions: 2,
    type: "house",
    status: "available",
    furnished: "furnished",
    epc: "C",
    description:
      "A spacious five-bedroom house on Heinz Burt Close in Eastleigh, finished and furnished for comfortable family or professional living. Warm living and dining spaces open towards the garden, with a modern fitted kitchen, three well-presented bathrooms and generously proportioned bedrooms throughout. Quiet residential setting with strong links into Southampton and nearby amenities — available to rent through Rex Estate Agents.",
    features: [
      "Five bedrooms",
      "Three bathrooms",
      "Furnished throughout",
      "Modern fitted kitchen",
      "Separate living & dining areas",
      "Quiet residential close",
      "Eastleigh location near Southampton",
      "Lettings managed by Rex",
    ],
    images: heinzBurtCloseGallery,
    featured: true,
  },
  {
    slug: "nichols-road-so14",
    ref: "REX2003",
    address: "Nichols Road, SO14",
    area: "Southampton City Centre",
    city: "Southampton",
    postcode: "SO14",
    rent: 2750,
    beds: 5,
    baths: 2,
    receptions: 1,
    type: "house",
    status: "available",
    furnished: "furnished",
    epc: "C",
    description:
      "A well-presented five-bedroom terraced house on Nichols Road in Southampton SO14 — ideal for professionals or sharers seeking a central location. Bright bedrooms with natural light, a modern shower bathroom and a separate WC, plus a classic bay-fronted exterior. Handy for the city centre, local amenities and transport links. Available to rent through Rex Estate Agents.",
    features: [
      "Five bedrooms",
      "Two bathrooms",
      "Furnished rooms",
      "Bay-fronted terraced house",
      "Central SO14 location",
      "Close to city amenities",
      "Lettings managed by Rex",
    ],
    images: nicholsRoadGallery,
    featured: true,
  },
  {
    slug: "nichols-road-so14-2",
    ref: "REX2004",
    address: "Nichols Road, SO14",
    area: "Southampton City Centre",
    city: "Southampton",
    postcode: "SO14",
    rent: 2850,
    beds: 5,
    baths: 2,
    receptions: 1,
    type: "house",
    status: "available",
    furnished: "unfurnished",
    epc: "C",
    description:
      "A contemporary five-bedroom house on Nichols Road in Southampton SO14, featuring a sleek high-gloss kitchen with integrated appliances, polished flooring throughout the hallway, a modern rainfall-shower bathroom and a second bathroom. Well placed for the city centre, amenities and transport — available to rent through Rex Estate Agents.",
    features: [
      "Five bedrooms",
      "Two bathrooms",
      "Modern high-gloss kitchen",
      "Integrated appliances",
      "Rainfall shower bathroom",
      "Central SO14 location",
      "Close to city amenities",
      "Lettings managed by Rex",
    ],
    images: nicholsRoadTwoGallery,
    featured: true,
  },
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
