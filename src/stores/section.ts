import { create } from "zustand";

export type Section =
  | "Moderation"
  | "Channels"
  | "Welcome & greeting"
  | "Ticket log"
  | "Custom commands";

type SectionState = {
  section: Section;
  setSection: (section: Section) => void;
};

export const useSectionStore = create<SectionState>()((set) => ({
  section: "Moderation",
  setSection: (section) => set({ section }),
}));
