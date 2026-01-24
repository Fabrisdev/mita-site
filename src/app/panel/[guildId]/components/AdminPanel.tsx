import { LoggedInAsPopup } from "@/auth/components/LoggedInAsPopup";
import { BotStatus } from "./BotStatus";
import { Header } from "./Header";
import { SectionManager } from "./SectionManager";
import { Sidebar } from "./Sidebar";

type Props = {
  username: string;
  id: string;
  avatar: string;
  jwt: string;
};

export function AdminPanel({ username, id, avatar, jwt }: Props) {
  return (
    <div className="bg-purple-950 min-h-svh flex flex-col">
      <Header>
        <BotStatus />
        <LoggedInAsPopup
          username={username}
          id={id}
          avatar={avatar}
          disableDefaultPositioning
        />
      </Header>
      <div className="flex flex-1">
        <Sidebar />
        <SectionManager jwt={jwt} />
      </div>
    </div>
  );
}
