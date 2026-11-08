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

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    await connectDb();
    const { id } = await params;
    const body = (await request.json()) as { status?: string };

    if (!body.status || !["new", "read", "replied"].includes(body.status)) {
      return jsonError("Invalid status");
    }

    const updated = await ValuationModel.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true },
    ).lean();

    if (!updated) return jsonError("Valuation not found", 404);
    return jsonOk({
      valuation: serializeValuation(updated as Record<string, unknown>),
    });
  } catch (error) {
    console.error("PATCH /api/valuations/[id]", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}
