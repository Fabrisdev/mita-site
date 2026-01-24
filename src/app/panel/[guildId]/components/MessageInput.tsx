import { useState } from "react";
import { MessagePreview } from "./MessagePreview";

export function MessageInput() {
  const [message, setMessage] = useState("Hello everyone!");
  return (
    <>
      <input
        type="text"
        name="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 p-1 rounded-md"
      />
      <MessagePreview message={message} />
    </>
  );
}
