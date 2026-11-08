import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDb } from "@/lib/db";
import { AdminUserModel } from "@/lib/models/AdminUser";

const COOKIE_NAME = "rex_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET must be set (min 16 characters)");
  }
  return new TextEncoder().encode(secret);
}

export async function ensureAdminUser() {
  await connectDb();
  const email = (process.env.ADMIN_EMAIL || "admin@rexestates.uk").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMeStrong123!";

  const existing = await AdminUserModel.findOne({ email });
  if (existing) return existing;

  const passwordHash = await bcrypt.hash(password, 10);
  return AdminUserModel.create({
    email,
    passwordHash,
    name: "Rex Admin",
  });
}

export async function verifyAdminCredentials(email: string, password: string) {
  await connectDb();
  await ensureAdminUser();

  const user = await AdminUserModel.findOne({ email: email.toLowerCase() });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return {
    id: user._id.toString(),
    email: user.email as string,
    name: user.name as string,
  };
}

export async function createAdminSession(payload: {
  id: string;
  email: string;
  name: string;
}) {
  const token = await new SignJWT({
    sub: payload.id,
    email: payload.email,
    name: payload.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      id: String(payload.sub || ""),
      email: String(payload.email || ""),
      name: String(payload.name || ""),
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session?.id) {
    const error = new Error("Unauthorized");
    (error as Error & { status: number }).status = 401;
    throw error;
  }
  return session;
}
