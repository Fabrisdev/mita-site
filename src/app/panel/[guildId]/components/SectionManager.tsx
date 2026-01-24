"use client";

import type { JSX } from "react";
import { type Section, useSectionStore } from "@/stores/section";
import { ChannelsSection } from "../sections/ChannelsSection";
import { CustomCommandsSection } from "../sections/CustomCommandsSection";
import { ModerationSection } from "../sections/ModerationSection";
import { TicketLogSection } from "../sections/TicketLogSection";
import { WelcomeSection } from "../sections/WelcomeSection";
import { SectionWrapper } from "./SectionWrapper";

type Props = {
  jwt: string;
};

const sections: Record<Section, (jwt: string) => JSX.Element> = {
  Channels: (jwt) => <ChannelsSection jwt={jwt} />,
  Moderation: () => <ModerationSection />,
  "Custom commands": () => <CustomCommandsSection />,
  "Ticket log": () => <TicketLogSection />,
  "Welcome & greeting": () => <WelcomeSection />,
};

export function SectionManager({ jwt }: Props) {
  const selected = useSectionStore((state) => state.section);
  const section = sections[selected];
  return <SectionWrapper>{section(jwt)}</SectionWrapper>;
}
