"use client";

import { useEffect, useState } from "react";
import { BOT_API_URL } from "@/consts";

export function BotStatus() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    fetch(`${BOT_API_URL}/status/ok`)
      .then(() => setIsOnline(true))
      .catch(() => setIsOnline(false));
  }, []);

  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="flex justify-center items-center gap-2">
      <span
        className={`font-bold p-2 rounded-xl border-2 ${isOnline ? "bg-green-400" : "bg-red-400"}`}
      >
        {isOnline ? "ONLINE" : "OFFLINE"}
      </span>
      <i className="text-">(last checked at: {formattedTime})</i>
    </div>
  );
}
