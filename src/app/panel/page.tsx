import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BotService } from "@/bot-service";

export default async function ChooseServerPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return redirect("/");
  const _guilds = await BotService.servers({ session });
  const guilds = Array.from(
    { length: 10 },
    (_, i) => _guilds[i % _guilds.length],
  );
  return (
    <div className="p-10 flex flex-col gap-5 bg-[#121214] min-h-svh">
      <h1 className="text-3xl text-center font-bold">Choose a server</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-6">
        {guilds.map((guild) => (
          <li
            key={guild.id}
            className="flex justify-center items-center gap-5 flex-col bg-[#1a1a1e] min-w-60 p-4 rounded-md border border-[#2e2e33]"
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
              className="bg-[#121214] border border-[#2e2e33] w-full text-center rounded-md p-2 font-bold hover:bg-[#242428] transition"
            >
              Go!
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
