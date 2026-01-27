import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { BOT_API_URL } from "./consts";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(session.value, secret);
    const online = await fetch(`${BOT_API_URL}/status/ok`)
      .then((res) => res.ok)
      .catch(() => false);
    console.log(online);
    if (!online)
      return Response.redirect(new URL("/?error=service_down", req.url));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/panel/:path*"],
};
