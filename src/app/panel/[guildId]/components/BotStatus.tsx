"use client";

import { useQuery } from "@tanstack/react-query";
import { BotService } from "@/bot-service";

export function BotStatus() {
  const {
    data: isOnline,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["bot-status"],
    queryFn: BotService.isOnline,
    refetchInterval: 100_000,
  });

  const formattedTime = dataUpdatedAt
    ? new Date(dataUpdatedAt)?.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;
  const message = isFetching ? "Checking..." : isOnline ? "ONLINE" : "OFFLINE";

  return (
    <div className="flex justify-center items-center gap-2">
      <span
        className={`font-bold p-2 rounded-xl border-2 ${isOnline ? "bg-green-400" : "bg-red-400"}`}
      >
        {message}
      </span>
      {formattedTime && <i>(last checked at: {formattedTime})</i>}
    </div>
  );
}
