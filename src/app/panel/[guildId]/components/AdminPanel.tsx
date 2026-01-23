import { LoggedInAsPopup } from "@/auth/components/LoggedInAsPopup";
import { BotStatus } from "./BotStatus";
import { Header } from "./Header";
import { SendMessageForm } from "./SendMessageForm";
import { Sidebar } from "./Sidebar";

type Props = {
  username: string;
  id: string;
  avatar: string;
  jwt: string;
};

export function AdminPanel({ username, id, avatar, jwt }: Props) {
  return (
    <div className="bg-purple-950 min-h-svh">
      <Header>
        <BotStatus />
        <LoggedInAsPopup
          username={username}
          id={id}
          avatar={avatar}
          disableDefaultPositioning
        />
      </Header>
      <div className="flex">
        <Sidebar />
        <div className="m-5">
          <SendMessageForm jwt={jwt} />
        </div>
      </div>
    </div>
  );
}
