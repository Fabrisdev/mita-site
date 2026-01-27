import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { BotService } from "./bot-service";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(session.value, secret);
    const online = await BotService.isOnline();
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
