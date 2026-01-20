import { ErrorPopup } from "@/error_handling/ErrorPopup";
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
      error?: string;
    }
  | {
      loggedIn: false;
      id?: never;
      avatar?: never;
      username?: never;
      error?: string;
    };

export function Home({ loggedIn, avatar, id, username, error }: Props) {
  return (
    <HomeContainer>
      <ErrorPopup error={error} />
      {loggedIn && (
        <LoggedInAsPopup
          avatar={avatar}
          id={id}
          username={username}
          delay="5s"
        />
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
