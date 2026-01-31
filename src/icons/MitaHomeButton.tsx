"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function MitaHomeButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="flex justify-center items-center cursor-pointer gap-2 p-2 absolute left-4 hover:bg-[#121214] rounded-md transition"
    >
      <Image
        src="/favicon.ico"
        alt="Image for home button"
        width={32}
        height={32}
        className="rounded-full"
      />
      <p className="font-bold">Mita Bot</p>
    </button>
  );
}
