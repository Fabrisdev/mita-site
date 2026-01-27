"use client";

import { SectionOption } from "./SectionOption";

export function Sidebar() {
  return (
    <ul className="bg-[#121214] w-80 flex flex-col gap-2 p-2">
      <SectionOption name="Moderation" />
      <SectionOption name="Channels" />
      <SectionOption name="Welcome & greeting" />
      <SectionOption name="Ticket log" />
      <SectionOption name="Custom commands" />
    </ul>
  );
}
