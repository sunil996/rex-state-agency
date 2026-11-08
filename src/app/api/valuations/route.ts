import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  getErrorMessage,
  getErrorStatus,
  jsonError,
  jsonOk,
} from "@/lib/api";
import { ValuationModel } from "@/lib/models/Valuation";
import { serializeValuation } from "@/lib/serialize";

export async function GET() {
  try {
    await requireAdmin();
    await connectDb();
    const docs = await ValuationModel.find().sort({ createdAt: -1 }).lean();
    return jsonOk({
      valuations: docs.map((d) =>
        serializeValuation(d as Record<string, unknown>),
      ),
    });
  } catch (error) {
    console.error("GET /api/valuations", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}

export async function POST(request: Request) {
  try {
    await connectDb();
    const body = (await request.json()) as Record<string, unknown>;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const address = String(body.address || "").trim();
    const postcode = String(body.postcode || "").trim();

    if (!name || !email || !address || !postcode) {
      return jsonError("Name, email, address and postcode are required");
    }

    const created = await ValuationModel.create({
      name,
      email,
      phone: String(body.phone || ""),
      address,
      postcode,
      propertyType: String(body.propertyType || ""),
      beds: Number(body.beds || 0),
      preferredDate: String(body.preferredDate || ""),
      notes: String(body.notes || ""),
      status: "new",
    });

    return jsonOk(
      { valuation: serializeValuation(created.toObject()) },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/valuations", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}
