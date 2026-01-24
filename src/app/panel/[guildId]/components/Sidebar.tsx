"use client";

import { SectionOption } from "./SectionOption";

export function Sidebar() {
  return (
    <ul className="bg-purple-600 w-80 border-r-2 flex flex-col gap-2 p-2">
      <SectionOption name="Moderation" />
      <SectionOption name="Channels" />
      <SectionOption name="Welcome & greeting" />
      <SectionOption name="Ticket log" />
      <SectionOption name="Custom commands" />
    </ul>
  );
}
