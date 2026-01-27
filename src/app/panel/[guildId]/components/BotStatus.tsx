"use client";

import { useBotStatus } from "../hooks/useBotStatus";

export function BotStatus() {
  const { isFetched, isFetching, isOnline, updatedAt } = useBotStatus();

  const formattedTime = formatTime(updatedAt);
  const message = isFetching ? "Checking..." : isOnline ? "ONLINE" : "OFFLINE";

  return (
    <div className="flex justify-center items-center gap-2">
      <span
        className={`font-bold p-2 rounded-xl border-2 ${isOnline ? "bg-green-400" : "bg-red-400"}`}
      >
        {message}
      </span>
      {isFetched && <i>(last checked at: {formattedTime})</i>}
    </div>
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
