"use client";

import { useState } from "react";
import { MitaBotLogo } from "@/icons/MitaBotLogo";
import { MitaBackground } from "../../backgrounds/MitaBackground";
import { LoggedInAsPopup } from "./LoggedInAsPopup";
import { LogInButton } from "./LogInButton";

type Props =
  | {
      initialLoggedIn: true;
      id: string;
      avatar: string;
      username: string;
    }
  | {
      initialLoggedIn: false;
      id?: never;
      avatar?: never;
      username?: never;
    };

export function Home({ initialLoggedIn, avatar, id, username }: Props) {
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setLoggedIn(false);
  }

  return (
    <main className="h-svh flex justify-center items-center overflow-hidden">
      {initialLoggedIn && loggedIn && (
        <LoggedInAsPopup avatar={avatar} id={id} username={username} />
      )}

      <MitaBackground />
      <div
        className="fixed -left-125 animation-delay-[5s] z-1000 bg-purple-600 p-10 rounded-xl flex flex-col gap-7 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 bg-size-[400%_400%] border-2 border-white"
        style={{
          animation: `
            custom-slide-in-left 1s ease-out 5s forwards,
            bg-shift 6s linear 6s infinite
          `,
          animationDelay: "5s",
        }}
      >
        <MitaBotLogo />
        <LogInButton loggedIn={loggedIn} />
        {loggedIn && (
          <button
            type="button"
            className="bg-purple-800 p-2 flex justify-center items-center gap-3 rounded-xs hover:bg-pink-500 transition duration-1500 min-w-60 border-2 border-pink-500 animate-heartbeat animate-iteration-count-infinite animate-delay-[7s] animate-duration-3000 font-bold cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </main>
  );
}
