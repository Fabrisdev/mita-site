import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } from "@/consts";

const ADMINISTRATOR = BigInt(0x8);
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
  const guilds = (await getUserGuilds(data.access_token)) as GuildData[];
  await storeJWTInCookies({
    id,
    username: userData.username,
    avatar: userData.avatar,
    guilds: organizeGuilds(guilds),
  });

  return Response.redirect(new URL("/panel", req.url));
}

async function validateCode(code: string) {
  const data = new URLSearchParams();
  data.append("client_id", DISCORD_CLIENT_ID);
  data.append("client_secret", process.env.DISCORD_CLIENT_SECRET ?? "");
  data.append("grant_type", "authorization_code");
  data.append("code", code);
  data.append("redirect_uri", DISCORD_REDIRECT_URI);
  data.append("scope", "identify guilds");

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

async function storeJWTInCookies(data: Record<string, unknown>) {
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

async function getUserGuilds(accessToken: string) {
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
}

function organizeGuilds(guilds: GuildData[]) {
  return guilds
    .filter((guild) => {
      if (guild.owner) return true;
      const perms = BigInt(guild.permissions);
      return (perms & ADMINISTRATOR) === ADMINISTRATOR;
    })
    .map((guild) => ({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      banner: guild.banner,
    }));
}

type GuildData = {
  id: string;
  name: string;
  icon: string;
  banner: string;
  permissions: number;
  owner: boolean;
};
