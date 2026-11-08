import { connectDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  getErrorMessage,
  getErrorStatus,
  jsonError,
  jsonOk,
} from "@/lib/api";
import { EnquiryModel } from "@/lib/models/Enquiry";
import { serializeEnquiry } from "@/lib/serialize";

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

    const updated = await EnquiryModel.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true },
    ).lean();

    if (!updated) return jsonError("Enquiry not found", 404);
    return jsonOk({
      enquiry: serializeEnquiry(updated as Record<string, unknown>),
    });
  } catch (error) {
    console.error("PATCH /api/enquiries/[id]", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}
