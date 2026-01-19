import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  return NextResponse.json({});
}
