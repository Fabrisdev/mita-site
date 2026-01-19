export async function GET() {
  const res = await fetch(`${process.env.BOT_API_URL}/ok`);
  if (res.ok) return new Response("", { status: 200 });
  return new Response("", { status: 500 });
}
