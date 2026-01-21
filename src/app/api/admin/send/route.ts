export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (data === null) return new Response("Missing fields", { status: 400 });
  const res = await fetch(`${process.env.BOT_API_URL}/channel/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BOT_API_SECRET}`,
    },
    body: JSON.stringify(data),
  }).catch(() => null);
  if (res === null) return new Response("Service is down", { status: 500 });
  return new Response("Wasn't able to send message", { status: res.status });
}
