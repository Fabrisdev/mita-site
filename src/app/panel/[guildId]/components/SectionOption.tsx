import Image from "next/image";
import { type Section, useSectionStore } from "@/stores/section";

type Props = {
  name: Section;
};

export function SectionOption({ name }: Props) {
  const setSection = useSectionStore((state) => state.setSection);
  const isSelected = useSectionStore((state) => state.section) === name;
  return (
    <li>
      <button
        type="button"
        onClick={() => setSection(name)}
        className="cursor-pointer w-full rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-900 p-2"
      >
        <Image src={`/${name}.svg`} width={32} height={32} alt={name} />
      </button>
    </li>
  );
}
