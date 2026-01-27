"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSectionStore } from "@/stores/section";
import { BotStatus } from "./BotStatus";
import { Header } from "./Header";
import { SectionManager } from "./SectionManager";
import { Sidebar } from "./Sidebar";

type Props = {
  jwt: string;
};

const queryClient = new QueryClient();

export function AdminPanel({ jwt }: Props) {
  const section = useSectionStore((state) => state.section);
  return (
    <div className="bg-[#1a1a1e] min-h-svh flex flex-col">
      <QueryClientProvider client={queryClient}>
        <Header>
          <BotStatus />
          <p>{section}</p>
        </Header>
        <div className="flex flex-1">
          <Sidebar />
          <SectionManager jwt={jwt} />
        </div>
      </QueryClientProvider>
    </div>
  );
}
