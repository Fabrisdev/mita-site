import Image from "next/image";

type Props = {
  loggedIn: boolean;
};

export function LogInButton({ loggedIn }: Props) {
  const PRODUCTION_HREF =
    "https://discord.com/oauth2/authorize?client_id=1461518757015851111&response_type=code&redirect_uri=https%3A%2F%2Fmita-bot.fabris.dev%2Fapi%2Fverify&scope=identify+guilds";
  const DEVELOPMENT_HREF =
    "https://discord.com/oauth2/authorize?client_id=1461518757015851111&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fverify&scope=identify+guilds";
  return (
    <a
      href={
        loggedIn
          ? "/panel"
          : process.env.NODE_ENV === "production"
            ? PRODUCTION_HREF
            : DEVELOPMENT_HREF
      }
      className="bg-purple-800 p-2 flex justify-center items-center gap-3 rounded-xs hover:bg-pink-500 transition duration-1500 min-w-60 border-2 border-pink-500 animate-heartbeat animate-iteration-count-infinite animate-delay-[6s] animate-duration-3000 relative"
    >
      <Image
        src="/discord.svg"
        alt="Discord logo"
        width={40}
        height={40}
        className="absolute -top-5 -left-5 -rotate-30"
      />
      <p className="font-bold">
        {loggedIn ? "Visit admin panel" : "Log in with Discord"}
      </p>
    </a>
  );
}
