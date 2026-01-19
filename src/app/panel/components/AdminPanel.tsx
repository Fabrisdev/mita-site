import { LoggedInAsPopup } from "@/auth/components/LoggedInAsPopup";
import { BotStatus } from "./BotStatus";
import { SendMessageForm } from "./SendMessageForm";

type Props = {
  username: string;
  id: string;
  avatar: string;
};

export function AdminPanel({ username, id, avatar }: Props) {
  return (
    <div>
      <BotStatus />
      <LoggedInAsPopup username={username} id={id} avatar={avatar} />
      <SendMessageForm />
    </div>
  );
}
