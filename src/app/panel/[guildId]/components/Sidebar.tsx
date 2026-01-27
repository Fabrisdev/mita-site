"use client";

import { BotStatus } from "./BotStatus";
import { GoBack } from "./GoBack";
import { SectionOption } from "./SectionOption";

type Props = {
  jwt: string;
};

export function Sidebar({ jwt }: Props) {
  return (
    <ul className="bg-[#121214] flex flex-col gap-2 p-2">
      <SectionOption name="Moderation" />
      <SectionOption name="Channels" />
      <SectionOption name="Welcome & greeting" />
      <SectionOption name="Ticket log" />
      <SectionOption name="Custom commands" />
      <div className="flex-1"></div>
      <GoBack jwt={jwt} />
      <BotStatus />
    </ul>
  );
}
