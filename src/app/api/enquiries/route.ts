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

export async function GET() {
  try {
    await requireAdmin();
    await connectDb();
    const docs = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
    return jsonOk({
      enquiries: docs.map((d) =>
        serializeEnquiry(d as Record<string, unknown>),
      ),
    });
  } catch (error) {
    console.error("GET /api/enquiries", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}

export async function POST(request: Request) {
  try {
    await connectDb();
    const body = (await request.json()) as Record<string, unknown>;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const type = String(body.type || "contact");

    if (!name || !email || !message) {
      return jsonError("Name, email and message are required");
    }

    const created = await EnquiryModel.create({
      type,
      name,
      email,
      phone: String(body.phone || ""),
      subject: String(body.subject || ""),
      message,
      propertyId: String(body.propertyId || ""),
      propertyRef: String(body.propertyRef || ""),
      preferredDate: String(body.preferredDate || ""),
      preferredTime: String(body.preferredTime || ""),
      status: "new",
    });

    // Email hook can be added later when SMTP env is set
    return jsonOk(
      { enquiry: serializeEnquiry(created.toObject()) },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/enquiries", error);
    return jsonError(getErrorMessage(error), getErrorStatus(error));
  }
}
