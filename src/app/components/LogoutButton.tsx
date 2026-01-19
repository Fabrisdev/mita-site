"use client";

import { useRouter } from "next/navigation";

type Props = {
  loggedIn: boolean;
};

export function LogoutButton({ loggedIn }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.refresh();
  }

  if (!loggedIn) return null;
  return (
    <button
      type="button"
      className="bg-purple-800 p-2 flex justify-center items-center gap-3 rounded-xs hover:bg-pink-500 transition duration-1500 min-w-60 border-2 border-pink-500 animate-heartbeat animate-iteration-count-infinite animate-delay-[7s] animate-duration-3000 font-bold cursor-pointer"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
}
