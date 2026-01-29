import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BotService } from "@/bot-service";

const messages = [
  "Go!",
  "Jump in!",
  "Dive in!",
  "Here we go!",
  "Launch!",
  "Boot up!",
] as const;

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
        {guilds.map((guild, i) => (
          <li
            key={guild.id}
            className="flex justify-center items-center gap-5 flex-col min-w-60 p-4 rounded-md border border-[#2e2e33]"
            style={{
              backgroundColor: `hsl(${(i * 40) % 360}, 15%, 12%)`,
            }}
          >
            <p className="font-bold">{guild.name}</p>
            <div className="w-full rounded-md flex justify-center items-center p-2 border border-[#2e2e33] bg-cover relative overflow-hidden">
              <div
                className="absolute w-full h-full bg-cover z-10 rounded-md blur-sm"
                style={{
                  backgroundImage: `url(${guild.icon})`,
                }}
              ></div>
              <img
                src={guild.icon}
                alt={`${guild.name}'s server`}
                width={96}
                height={96}
                className="rounded-full z-20"
              />
            </div>
            <ol className="w-full list-disc pl-4">
              <li>
                User count: <strong>10.2k</strong>
              </li>
              <li>
                Your role: <strong>Administrator</strong>
              </li>
            </ol>
            <Link
              href={`/panel/${guild.id}`}
              className="bg-[#121214] border border-[#2e2e33] w-full text-center rounded-md p-2 font-bold hover:bg-[#242428] transition"
            >
              {messages[i % messages.length]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
