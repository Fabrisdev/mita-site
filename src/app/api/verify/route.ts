import { DISCORD_CLIENT_ID } from "@/consts";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const ALLOWED_USER_IDS = [
  "317105612100075520",
  "478728814399324188",
  "1343734688300142664",
  "1316452290990702653",
];

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (typeof code !== "string")
    return new Response("No code provided", { status: 400 });

  const validatedResponse = await validateCode(code);
  if (!validatedResponse.ok)
    return Response.redirect(new URL("/?error=invalid_code", req.url));

  const data = await validatedResponse.json();
  const userData = await getUserData(data.access_token);
  const { id } = userData;
  if (!ALLOWED_USER_IDS.includes(id))
    return Response.redirect(new URL("/?error=not_allowed", req.url));

  await storeJWTInCookies({
    id,
    username: userData.username,
    avatar: userData.avatar,
  });

  return Response.redirect(new URL("/panel", req.url));
}

async function validateCode(code: string) {
  const data = new URLSearchParams();
  data.append("client_id", DISCORD_CLIENT_ID);
  data.append("client_secret", process.env.DISCORD_CLIENT_SECRET ?? "");
  data.append("grant_type", "authorization_code");
  data.append("code", code);
  data.append("redirect_uri", process.env.DISCORD_REDIRECT_URI ?? "");
  data.append("scope", "identify");

  return await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

async function getUserData(accessToken: string) {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return await response.json();
}

async function storeJWTInCookies(data: Record<string, string>) {
  const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookiesStore = await cookies();
  cookiesStore.set("session", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
