export async function GET() {
  const ok = await fetch(`${process.env.BOT_API_URL}/ok`).catch(() => false);
  if (ok) return new Response("", { status: 200 });
  return new Response("", { status: 500 });
}
