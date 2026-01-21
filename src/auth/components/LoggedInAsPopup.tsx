type Props = {
  id: string;
  username: string;
  avatar: string;
  delay?: string;
  disableDefaultPositioning?: boolean;
};

export function LoggedInAsPopup({
  id,
  username,
  avatar,
  delay,
  disableDefaultPositioning,
}: Props) {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  return (
    <div
      className={`bg-pink-500 rounded-xl flex justify-center items-center gap-2 z-1000 p-2 border-2 animate-fade-in-down ${disableDefaultPositioning ? "" : "fixed top-2 right-2"}`}
      style={{
        animationDelay: delay ?? "0",
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: This image does not come from my site */}
      <img
        src={avatarUrl}
        alt="Avatar icon"
        height={32}
        width={32}
        className="rounded-full"
      />
      Logged in as: <strong>{username}</strong>
    </div>
  );
}
