import Image from "next/image";
import { type Section, useSectionStore } from "@/stores/section";

type Props = {
  name: Section;
};

export function SectionOption({ name }: Props) {
  const setSection = useSectionStore((state) => state.setSection);
  const isSelected = useSectionStore((state) => state.section) === name;
  return (
    <li className="flex gap-2 justify-center items-center group relative">
      <div
        className={`bg-white h-[0%] opacity-0 w-2 rounded-xl group-hover:opacity-100 group-hover:h-[50%] transition-all duration-150 absolute right-full mr-1 ${isSelected && "h-full group-hover:h-full opacity-100"}`}
      ></div>
      <button
        type="button"
        onClick={() => setSection(name)}
        className="cursor-pointer w-full rounded-xl bg-[#1a1a1e] border border-[#28282c] hover:bg-[#242428] p-2 peer ml-1"
      >
        <Image src={`/${name}.svg`} width={32} height={32} alt={name} />
      </button>
      <p className="pointer-events-none opacity-0 text-[#efeff1] font-bold group-hover:opacity-100 bg-[#242429] absolute left-full p-2 rounded-md ml-4 whitespace-nowrap transition border border-[#2e2e33] before:content-[''] before:absolute before:-left-1.5 before:top-1/2 before:-translate-y-1/2 before:border-y-6 before:border-y-transparent before:border-r-6 before:border-r-[#242429]">
        {name}
      </p>
    </li>
  );
}
