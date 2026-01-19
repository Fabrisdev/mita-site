import { MitaBotLogo } from "@/icons/MitaBotLogo";
import { LoggedInAsPopup } from "../../auth/components/LoggedInAsPopup";
import { LogInButton } from "../../auth/components/LogInButton";
import { LogoutButton } from "../../auth/components/LogoutButton";
import { MitaBackground } from "../../backgrounds/MitaBackground";
import { HomeContainer } from "./HomeContainer";
import { MainMenu } from "./MainMenu";

type Props =
  | {
      loggedIn: true;
      id: string;
      avatar: string;
      username: string;
    }
  | {
      loggedIn: false;
      id?: never;
      avatar?: never;
      username?: never;
    };

export function Home({ loggedIn, avatar, id, username }: Props) {
  return (
    <HomeContainer>
      {loggedIn && (
        <LoggedInAsPopup avatar={avatar} id={id} username={username} />
      )}

      <MitaBackground />
      <MainMenu>
        <MitaBotLogo />
        <LogInButton loggedIn={loggedIn} />
        <LogoutButton loggedIn={loggedIn} />
      </MainMenu>
    </HomeContainer>
  );
}
