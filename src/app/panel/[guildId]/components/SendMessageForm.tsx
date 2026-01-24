"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { BOT_API_URL } from "@/consts";
import { ErrorPopup } from "@/error_handling/ErrorPopup";
import { ChannelSelector } from "./ChannelSelector";
import { MessageInput } from "./MessageInput";

type Props = {
  jwt: string;
};

export function SendMessageForm({ jwt }: Props) {
  const { guildId } = useParams<{ guildId: string }>();
  const [status, setStatus] = useState<
    "message_send_success" | "message_send_failure" | undefined
  >(undefined);

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
    if (res.ok) return setStatus("message_send_success");
    setStatus("message_send_failure");
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        method="POST"
        className="bg-purple-600 flex flex-col p-4 border-2 rounded-md gap-3"
      >
        <p className="text-xl">Send a message to a channel</p>
        <MessageInput />
        <ChannelSelector jwt={jwt} />
        <input
          type="submit"
          value="Send"
          className="bg-pink-400 hover:bg-pink-500 border-2 rounded-md p-1 font-bold cursor-pointer transition"
        />
      </form>
      <ErrorPopup error={status} onAccept={() => setStatus(undefined)} />
    </>
  );
}
