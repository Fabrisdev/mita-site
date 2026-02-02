"use client";

import { useEffect, useRef } from "react";
import { BotStatus } from "./BotStatus";
import { GoBack } from "./GoBack";
import { SectionOption } from "./SectionOption";

type Props = {
  jwt: string;
};

export function Sidebar({ jwt }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    function onScroll() {
      if (ref.current === null) return;
      const pixels = 40 - window.scrollY;
      ref.current.style.height =
        pixels < 0 ? "100svh" : `calc(100svh - ${pixels}px)`;
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <ul
      ref={ref}
      className="bg-[#121214] sticky top-0 h-[calc(100svh-40px)] flex flex-col gap-2 p-2"
    >
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
