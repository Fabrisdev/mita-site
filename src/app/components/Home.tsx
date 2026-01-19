"use client";

import { useState } from "react";
import { MitaBotLogo } from "@/icons/MitaBotLogo";
import { MitaBackground } from "../../backgrounds/MitaBackground";
import { LoggedInAsPopup } from "./LoggedInAsPopup";
import { LogInButton } from "./LogInButton";
import { LogoutButton } from "./LogoutButton";
import { MainMenu } from "./MainMenu";

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

  return (
    <main className="h-svh flex justify-center items-center overflow-hidden">
      {initialLoggedIn && loggedIn && (
        <LoggedInAsPopup avatar={avatar} id={id} username={username} />
      )}

      <MitaBackground />
      <MainMenu>
        <MitaBotLogo />
        <LogInButton loggedIn={loggedIn} />
        <LogoutButton loggedIn={loggedIn} uiLogout={() => setLoggedIn(false)} />
      </MainMenu>
    </main>
  );
}
