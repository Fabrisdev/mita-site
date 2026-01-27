"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

export function AdminPanel({ username, id, avatar, jwt }: Props) {
  return (
    <div className="bg-purple-950 min-h-svh flex flex-col">
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div>
  );
}
