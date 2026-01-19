const ALLOWED_USER_IDS = [
  "317105612100075520",
  "478728814399324188",
  "1343734688300142664",
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (typeof code !== "string")
    return new Response("No code provided", { status: 400 });

  const validatedResponse = await validateCode(code);
  if (!validatedResponse.ok)
    return new Response("Invalid code provided", { status: 400 });

  const data = await validatedResponse.json();
  const userData = await getUserData(data.access_token);
  const { id } = userData;
  if (!ALLOWED_USER_IDS.includes(id))
    return new Response("ID not allowed", { status: 400 });
  return new Response(userData.username);
}

async function validateCode(code: string) {
  const data = new URLSearchParams();
  data.append("client_id", process.env.DISCORD_CLIENT_ID ?? "");
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
