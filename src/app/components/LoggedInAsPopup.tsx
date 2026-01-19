type Props = {
  id: string;
  username: string;
  avatar: string;
};

export function LoggedInAsPopup({ id, username, avatar }: Props) {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  return (
    <div className="bg-white rounded-xs text-black font-bold flex justify-center items-center gap-2 fixed top-2 right-2 z-1000">
      {/** biome-ignore lint/performance/noImgElement: This image does not come from my site */}
      <img
        src={avatarUrl}
        alt="Avatar icon"
        height={64}
        width={64}
        className="rounded-full"
      />
      Logged in as {username}
    </div>
  );
}
