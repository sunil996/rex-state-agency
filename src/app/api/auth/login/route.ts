import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const email = body.email?.trim() || "";
    const password = body.password || "";

    if (!email || !password) {
      return jsonError("Email and password are required", 400);
    }

    const user = await verifyAdminCredentials(email, password);
    if (!user) {
      return jsonError("Invalid email or password", 401);
    }

    await createAdminSession(user);
    return jsonOk({ ok: true, user: { email: user.email, name: user.name } });
  } catch (error) {
    console.error("login error", error);
    return jsonError("Login failed", 500);
  }
}
