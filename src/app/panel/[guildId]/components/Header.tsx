import { useSectionStore } from "@/stores/section";
import { SectionOptionDisplay } from "./SectionOptionDisplay";

export function Header() {
  const section = useSectionStore((state) => state.section);
  return (
    <div className="bg-[#121214] flex justify-center items-center p-2">
      <SectionOptionDisplay name={section} />
      <p>{section}</p>
    </div>
  );
}
