"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BotService, type Guild } from "@/bot-service";

type Props = {
  jwt: string;
};

export function GoBack({ jwt }: Props) {
  const params = useParams<{ guildId: string }>();
  const [guild, setGuild] = useState<Guild | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    BotService.findGuild({ guildId: params.guildId, session: jwt }).then(
      (guild) => setGuild(guild),
    );
  }, []);

  return (
    <li className="flex gap-2 justify-center items-center group relative">
      <div
        className={`bg-white h-[0%] opacity-0 w-2 rounded-xl group-hover:opacity-100 group-hover:h-[50%] transition-all duration-150 absolute right-full mr-1`}
      ></div>
      <button
        type="button"
        onClick={() => router.push("/panel")}
        className="cursor-pointer w-full rounded-xl bg-[#1a1a1e] border border-[#28282c] hover:bg-[#242428] p-2 peer ml-1 bg-cover"
        style={{
          backgroundImage: `url(${guild?.icon})`,
        }}
      >
        <div className="h-8 w-8"></div>
      </button>
      <p className="pointer-events-none opacity-0 text-[#efeff1] font-bold group-hover:opacity-100 bg-[#242429] absolute left-full p-2 rounded-md ml-4 whitespace-nowrap transition border border-[#2e2e33] before:content-[''] before:absolute before:-left-1.5 before:top-1/2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-r-6 before:border-r-[#242429]">
        You’re in {guild?.name}. Click to return.
      </p>
    </li>
  );
}
