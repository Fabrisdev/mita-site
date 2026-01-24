import { useState } from "react";
import { MessagePreview } from "./MessagePreview";

type Props = {
  jwt: string;
};

export function MessageInput({ jwt }: Props) {
  const [message, setMessage] = useState("");
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
      <MessagePreview jwt={jwt} message={message} />
    </>
  );
}
