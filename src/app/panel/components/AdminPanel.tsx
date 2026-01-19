"use client";

import { useEffect, useState } from "react";
import { LoggedInAsPopup } from "@/auth/components/LoggedInAsPopup";

type Props = {
  username: string;
  id: string;
  avatar: string;
};

export function AdminPanel({ username, id, avatar }: Props) {
  const [isOK, setIsOK] = useState(false);

  useEffect(() => {
    fetch("/api/admin/ok")
      .then(() => setIsOK(true))
      .catch(() => setIsOK(false));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/admin/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return alert("Message sent");
    alert("Couldn't send message");
  }

  return (
    <div>
      <span
        className={`w-40 h-20 font-bold p-2 rounded-xs ${isOK ? "bg-green-400" : "bg-red-400"}`}
      >
        {isOK ? "ONLINE" : "OFFLINE"}
      </span>
      <LoggedInAsPopup username={username} id={id} avatar={avatar} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        method="POST"
        className="bg-gray-500 flex flex-col w-min p-2"
      >
        <input type="text" name="message" placeholder="Message" />
        <input type="text" name="channelId" placeholder="Channel ID" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
