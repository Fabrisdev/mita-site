import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BOT_API_URL } from "@/consts";

export default async function ChooseServerPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return redirect("/");
  const guilds = (await fetch(`${BOT_API_URL}/guild`, {
    headers: {
      Authorization: `Bearer ${session.value}`,
    },
  }).then((res) => res.json())) as { name: string; id: string; icon: string }[];
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Choose a server</h1>
      <ul>
        {guilds.map((guild) => (
          <li
            key={guild.id}
            className="flex justify-center items-center gap-5 flex-col bg-gray-600 max-w-60 p-4 rounded-md"
          >
            <img
              src={guild.icon}
              alt={`${guild.name}'s server`}
              width={64}
              height={64}
              className="rounded-full"
            />
            <p>{guild.name}</p>
            <Link
              href={`/panel/${guild.id}`}
              className="bg-gray-800 w-full text-center rounded-md p-2 font-bold hover:bg-gray-900 transition"
            >
              Go!
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
