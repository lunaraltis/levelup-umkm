import "server-only";

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE_NAME = "levelup_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getEnvValue(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET") {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminAuthConfigured() {
  return Boolean(getEnvValue("ADMIN_PASSWORD") && getEnvValue("ADMIN_SESSION_SECRET"));
}

export function validateAdminPassword(password: string) {
  const configuredPassword = getEnvValue("ADMIN_PASSWORD");

  if (!configuredPassword) {
    return false;
  }

  return safeCompare(password, configuredPassword);
}

export function verifyAdminSessionToken(token: string | undefined) {
  const secret = getEnvValue("ADMIN_SESSION_SECRET");

  if (!token || !secret) {
    return false;
  }

  const [expiresAtValue, signature] = token.split(".");

  if (!expiresAtValue || !signature) {
    return false;
  }

  if (!safeCompare(signature, sign(expiresAtValue, secret))) {
    return false;
  }

  const expiresAt = Number(expiresAtValue);

  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  return verifyAdminSessionToken(token);
}

export async function createAdminSession() {
  const secret = getEnvValue("ADMIN_SESSION_SECRET");

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const expiresAtValue = String(expiresAt);
  const token = `${expiresAtValue}.${sign(expiresAtValue, secret)}`;
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}
