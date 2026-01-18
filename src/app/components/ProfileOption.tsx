import Image from "next/image";
import type { AllowedPeople } from "@/types";

type Props = {
  name: AllowedPeople;
  selected: boolean;
  onClick: () => void;
};

export function ProfileOption({ name, selected, onClick }: Props) {
  return (
    <button onClick={onClick} type="button">
      <Image
        src={`/${name}.webp`}
        width={128}
        height={128}
        alt={name}
        className="hover:scale-115 transition cursor-pointer"
        style={{
          opacity: selected ? 1 : 0.7,
        }}
      />
    </button>
  );
}
