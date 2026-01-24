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
        className={`cursor-pointer w-full rounded-md bg-purple-500 p-2 border-2 hover:bg-purple-600  ${isSelected && "bg-red-400 hover:bg-red-500 font-bold"}`}
      >
        {name}
      </button>
    </li>
  );
}
