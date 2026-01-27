import Image from "next/image";

type Props = {
  name: string;
};

export function SectionOptionDisplay({ name }: Props) {
  return (
    <li className="flex gap-2 justify-center items-center group relative">
      <div className="w-full rounded-md bg-[#1a1a1e] border border-[#28282c] p-1 peer mr-2">
        <Image src={`/${name}.svg`} width={16} height={16} alt={name} />
      </div>
    </li>
  );
}
