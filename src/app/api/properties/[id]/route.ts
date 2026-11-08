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

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDb();
    const { id } = await params;

    const doc =
      (await PropertyModel.findById(id).lean().catch(() => null)) ||
      (await PropertyModel.findOne({ slug: id }).lean());

    if (!doc) return jsonError("Property not found", 404);
    return jsonOk({
      property: serializeProperty(doc as Record<string, unknown>),
    });
  } catch (error) {
    console.error("GET /api/properties/[id]", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    await connectDb();
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;

    const allowed = [
      "slug",
      "ref",
      "address",
      "area",
      "city",
      "postcode",
      "rent",
      "beds",
      "baths",
      "receptions",
      "type",
      "status",
      "furnished",
      "epc",
      "description",
      "features",
      "images",
      "featured",
    ] as const;

    const patch: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) patch[key] = body[key];
    }

    const updated = await PropertyModel.findByIdAndUpdate(id, patch, {
      new: true,
    }).lean();

    if (!updated) return jsonError("Property not found", 404);
    return jsonOk({
      property: serializeProperty(updated as Record<string, unknown>),
    });
  } catch (error) {
    console.error("PATCH /api/properties/[id]", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin();
    await connectDb();
    const { id } = await params;

    const deleted = await PropertyModel.findByIdAndDelete(id).lean();
    if (!deleted) return jsonError("Property not found", 404);
    return jsonOk({ ok: true });
  } catch (error) {
    console.error("DELETE /api/properties/[id]", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}
