import { useState } from "react";
import { MessagePreview } from "./MessagePreview";

export function MessageInput() {
  const [message, setMessage] = useState("Hello everyone!");
  const isEmpty = message.trim().length === 0;
  return (
    <>
      <input
        type="text"
        name="message"
        placeholder="Message to send"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`border border-[#28282c] p-2 rounded-md outline-none focus:outline-none focus:ring-0 ${isEmpty ? "border-red-500" : "border-[#28282c]"}`}
      />
      {isEmpty && <small>⚠️ Message cannot be empty.</small>}
      <MessagePreview message={message} />
    </>
  );
}
