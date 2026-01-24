"use client";

import { useSectionStore } from "@/stores/section";
import { SectionWrapper } from "./SectionWrapper";
import { SendMessageForm } from "./SendMessageForm";

type Props = {
  jwt: string;
};

export function SectionManager({ jwt }: Props) {
  const selected = useSectionStore((state) => state.section);
  return (
    <SectionWrapper>
      {selected === "Channels" ? <SendMessageForm jwt={jwt} /> : null}
    </SectionWrapper>
  );
}
