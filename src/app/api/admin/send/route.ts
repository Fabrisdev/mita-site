export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (data === null) return new Response("Missing fields", { status: 400 });
  const res = await fetch(`${process.env.BOT_API_URL}/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      secret: process.env.BOT_API_SECRET,
    }),
  }).catch(() => null);
  if (res === null) return new Response("Service is down", { status: 500 });
  return new Response("Wasn't able to send message", { status: res.status });
}
