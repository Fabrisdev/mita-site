export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (data === null) return new Response("Missing fields", { status: 400 });
  const res = await fetch(`${process.env.BOT_API_URL}/send-message`, {
    method: "POST",
    body: JSON.stringify(data),
  }).catch(() => null);
  if (res === null)
    return new Response("Wasn't able to send message", { status: 500 });
  if (res.ok) return new Response("", { status: 200 });
  return new Response("Wasn't able to send message", { status: 500 });
}
