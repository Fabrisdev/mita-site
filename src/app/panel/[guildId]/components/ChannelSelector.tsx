"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BOT_API_URL } from "@/consts";

type Props = {
  jwt: string;
};

export function ChannelSelector({ jwt }: Props) {
  const { guildId } = useParams<{ guildId: string }>();
  const [channels, setChannels] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    fetch(`${BOT_API_URL}/${guildId}/channel`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChannels(data))
      .catch(() => null);
  }, []);

  return (
    <select name="channelId" className="p-2 border-2 rounded-md">
      {channels.map((channel) => (
        <option key={channel.id} value={channel.id}>
          #{channel.name}
        </option>
      ))}
    </select>
  );
}
