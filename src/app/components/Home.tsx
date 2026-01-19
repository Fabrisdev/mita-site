import { MitaBotLogo } from "@/icons/MitaBotLogo";
import { MitaBackground } from "../../backgrounds/MitaBackground";
import { HomeContainer } from "./HomeContainer";
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
  return (
    <HomeContainer>
      {initialLoggedIn && (
        <LoggedInAsPopup avatar={avatar} id={id} username={username} />
      )}

      <MitaBackground />
      <MainMenu>
        <MitaBotLogo />
        <LogInButton loggedIn={initialLoggedIn} />
        <LogoutButton loggedIn={initialLoggedIn} />
      </MainMenu>
    </HomeContainer>
  );
}
