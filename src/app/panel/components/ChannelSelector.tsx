"use client";

import { useEffect, useState } from "react";
import { BOT_API_URL } from "@/consts";

export function ChannelSelector() {
  const [channels, setChannels] = useState<{ name: string; id: string }[]>([]);

  function fetchChannels() {
    fetch(`${BOT_API_URL}/channel/1461519620660924543`)
      .then((res) => res.json())
      .then((data) => setChannels(data))
      .catch(() => null);
  }

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <select name="" id="">
      {channels.map((channel) => (
        <option key={channel.id}>#{channel.name}</option>
      ))}
    </select>
  );
}
