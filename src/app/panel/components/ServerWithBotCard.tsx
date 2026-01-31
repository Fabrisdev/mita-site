import Link from "next/link";
import type { CSSProperties } from "react";
import type { Guild } from "@/bot-service";

export const messages = [
  "Go!",
  "Jump in!",
  "Dive in!",
  "Here we go!",
  "Launch!",
  "Boot up!",
] as const;

export function ServerWithBotCard({ guild, i }: { guild: Guild; i: number }) {
  return (
    <li
      key={guild.id}
      className="flex justify-center items-center gap-5 flex-col min-w-[90%] p-4 rounded-md border border-[#2e2e33] shadow-lg shadow-black"
      style={{
        backgroundColor: `hsl(${(i * 40) % 360}, 20%, 12%)`,
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
          User count: <strong>{guild.memberCount}</strong>
        </li>
        <li>
          Your role: <strong>{guild.highestRole}</strong>
        </li>
      </ol>
      <Link
        href={`/panel/${guild.id}`}
        className="bg-[hsl(var(--h)_60%_10%)] border border-[#2e2e33] w-full text-center rounded-md p-2 font-bold hover:bg-[hsl(var(--h)_100%_12%)] hover:scale-105 transition"
        style={
          {
            "--h": (i * 40) % 360,
          } as CSSProperties & { "--h": number }
        }
      >
        {messages[i % messages.length]}
      </Link>
    </li>
  );
}
