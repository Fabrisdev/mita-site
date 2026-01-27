"use client";

import Image from "next/image";
import { useBotStatus } from "../hooks/useBotStatus";

export function BotStatus() {
  const { isFetched, isFetching, isOnline, updatedAt } = useBotStatus();

  const formattedTime = formatTime(updatedAt);
  const message = isFetching ? "Checking..." : isOnline ? "Online" : "Offline";
  const lastCheckedAtMessage = isFetched
    ? `API status: ${message}. Last checked at: ${formattedTime}`
    : "Haven't checked yet";

  return (
    <li className="flex gap-2 justify-center items-center group relative">
      <div
        className={`bg-white h-[0%] opacity-0 w-2 rounded-xl group-hover:opacity-100 group-hover:h-[50%] transition-all duration-150 absolute right-full mr-1`}
      ></div>
      <div className="cursor-pointer w-full rounded-xl bg-[#1a1a1e] border border-[#28282c] hover:bg-[#242428] p-2 peer ml-1">
        <Image
          src={`/status.svg`}
          width={32}
          height={32}
          alt={`Bot status: ${message}. Last checked at: ${formattedTime}`}
        />
      </div>
      <p className="opacity-0 text-[#efeff1] font-bold group-hover:opacity-100 bg-[#242429] absolute left-full p-2 rounded-md ml-4 whitespace-nowrap transition border border-[#2e2e33] before:content-[''] before:absolute before:-left-1.5 before:top-1/2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-r-6 before:border-r-[#242429]">
        {lastCheckedAtMessage}
      </p>
    </li>
  );
}

function formatTime(time: number) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}
