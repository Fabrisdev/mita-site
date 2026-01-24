"use client";

import { useSectionStore } from "@/stores/section";
import { ChannelsSection } from "../sections/ChannelsSection";
import { SectionWrapper } from "./SectionWrapper";

type Props = {
  jwt: string;
};

export function SectionManager({ jwt }: Props) {
  const selected = useSectionStore((state) => state.section);
  return (
    <SectionWrapper>
      {selected === "Channels" ? <ChannelsSection jwt={jwt} /> : null}
    </SectionWrapper>
  );
}
