"use client";

import { useSectionStore } from "@/stores/section";
import { ChannelsSection } from "../sections/ChannelsSection";
import { CustomCommandsSection } from "../sections/CustomCommandsSection";
import { ModerationSection } from "../sections/ModerationSection";
import { TicketLogSection } from "../sections/TicketLogSection";
import { WelcomeSection } from "../sections/WelcomeSection";
import { SectionWrapper } from "./SectionWrapper";

type Props = {
  jwt: string;
};

export function SectionManager({ jwt }: Props) {
  const selected = useSectionStore((state) => state.section);
  return (
    <SectionWrapper>
      {selected === "Channels" ? (
        <ChannelsSection jwt={jwt} />
      ) : selected === "Moderation" ? (
        <ModerationSection />
      ) : selected === "Custom commands" ? (
        <CustomCommandsSection />
      ) : selected === "Ticket log" ? (
        <TicketLogSection />
      ) : (
        <WelcomeSection />
      )}
    </SectionWrapper>
  );
}
