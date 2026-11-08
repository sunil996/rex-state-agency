import { getAdminSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const session = await getAdminSession();
  if (!session?.id) {
    return jsonError("Unauthorized", 401);
  }
  return jsonOk({ user: session });
}
