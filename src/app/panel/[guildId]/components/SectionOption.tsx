import { type Section, useSectionStore } from "@/stores/section";

type Props = {
  name: Section;
};

export function SectionOption({ name }: Props) {
  const setSection = useSectionStore((state) => state.setSection);
  return (
    <li>
      <button type="button" onClick={() => setSection(name)}>
        {name}
      </button>
    </li>
  );
}
