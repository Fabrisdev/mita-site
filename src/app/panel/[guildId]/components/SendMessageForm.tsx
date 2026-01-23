"use client";

import { useParams } from "next/navigation";
import { BOT_API_URL } from "@/consts";
import { ChannelSelector } from "./ChannelSelector";

type Props = {
  jwt: string;
};

export function SendMessageForm({ jwt }: Props) {
  const { guildId } = useParams<{ guildId: string }>();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`${BOT_API_URL}/${guildId}/channel/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) return alert("Message sent");
    alert("Couldn't send message");
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      method="POST"
      className="bg-purple-600 flex flex-col p-4 border-2 rounded-md gap-3"
    >
      <p>Send a message to a channel</p>
      <input
        type="text"
        name="message"
        placeholder="Message"
        className="border-2 p-1 rounded-md"
      />
      <ChannelSelector jwt={jwt} />
      <input
        type="submit"
        value="Send"
        className="bg-pink-400 hover:bg-pink-500 border-2 rounded-md p-1 font-bold cursor-pointer transition"
      />
    </form>
  );
}
