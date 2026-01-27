import Image from "next/image";
import { type Section, useSectionStore } from "@/stores/section";

type Props = {
  name: Section;
};

export function SectionOption({ name }: Props) {
  const setSection = useSectionStore((state) => state.setSection);
  const isSelected = useSectionStore((state) => state.section) === name;
  return (
    <li className="flex gap-2 justify-center items-center group">
      <div
        className={`bg-white h-[0%] w-2 rounded-xl group-hover:h-[50%] transition-all duration-150 ${isSelected && "h-full group-hover:h-full"}`}
      ></div>
      <button
        type="button"
        onClick={() => setSection(name)}
        className="cursor-pointer w-full rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-900 p-2 peer"
      >
        <Image src={`/${name}.svg`} width={32} height={32} alt={name} />
      </button>
    </li>
  );
}
