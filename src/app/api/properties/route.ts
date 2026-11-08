import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  getErrorMessage,
  getErrorStatus,
  jsonError,
  jsonOk,
} from "@/lib/api";
import { PropertyModel } from "@/lib/models/Property";
import { serializeProperty } from "@/lib/serialize";
import { uniquePropertySlug } from "@/lib/slug";

export async function GET(request: Request) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim().toLowerCase() || "";
    const city = searchParams.get("city") || "";
    const beds = searchParams.get("beds");
    const maxRent = searchParams.get("maxRent");
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";
    const featured = searchParams.get("featured");

    const filter: Record<string, unknown> = {};

    if (city) filter.city = city;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (featured === "true") filter.featured = true;
    if (beds) filter.beds = { $gte: Number(beds) };
    if (maxRent) filter.rent = { $lte: Number(maxRent) };

    let docs = await PropertyModel.find(filter).sort({ createdAt: -1 }).lean();

    if (q) {
      docs = docs.filter((p) => {
        const hay = `${p.address} ${p.area} ${p.postcode} ${p.city} ${p.ref}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return jsonOk({
      properties: docs.map((d) => serializeProperty(d as Record<string, unknown>)),
    });
  } catch (error) {
    console.error("GET /api/properties", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    await connectDb();

    const body = (await request.json()) as Record<string, unknown>;
    const address = String(body.address || "").trim();
    if (!address) return jsonError("Address is required");

    const slug =
      String(body.slug || "").trim() ||
      (await uniquePropertySlug(
        `${address}-${String(body.postcode || "")}`,
      ));

    const created = await PropertyModel.create({
      slug,
      ref: String(body.ref || `REX${Date.now().toString().slice(-6)}`),
      address,
      area: String(body.area || ""),
      city: body.city === "Southampton" ? "Southampton" : "London",
      postcode: String(body.postcode || ""),
      rent: Number(body.rent || 0),
      beds: Number(body.beds || 0),
      baths: Number(body.baths || 0),
      receptions: Number(body.receptions || 1),
      type: body.type || "apartment",
      status: body.status || "available",
      furnished: body.furnished || "unfurnished",
      epc: String(body.epc || ""),
      description: String(body.description || ""),
      features: Array.isArray(body.features) ? body.features : [],
      images: Array.isArray(body.images) ? body.images : [],
      featured: Boolean(body.featured),
    });

    return jsonOk(
      { property: serializeProperty(created.toObject()) },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/properties", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}
