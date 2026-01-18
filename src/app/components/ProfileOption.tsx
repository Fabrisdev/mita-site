import Image from "next/image";
import type { AllowedPeople } from "@/types";

type Props = {
  name: AllowedPeople;
  selected: boolean;
  onClick: () => void;
  className?: string;
};

export function ProfileOption({ name, selected, onClick, className }: Props) {
  return (
    <button onClick={onClick} type="button">
      <Image
        src={`/${name}.webp`}
        width={128}
        height={128}
        alt={name}
        className={`hover:scale-115 transition cursor-pointer ${className}`}
        style={{
          opacity: selected ? 1 : 0.7,
        }}
      />
    </button>
  );
}
