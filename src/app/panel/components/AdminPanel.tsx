import { LoggedInAsPopup } from "@/auth/components/LoggedInAsPopup";

type Props = {
  username: string;
  id: string;
  avatar: string;
};

export function AdminPanel({ username, id, avatar }: Props) {
  return (
    <div>
      <LoggedInAsPopup username={username} id={id} avatar={avatar} />
      <form
        action="/api/admin/send-message"
        method="POST"
        className="bg-gray-500 flex flex-col w-min p-2"
      >
        <input type="text" name="message" placeholder="Message" />
        <input type="text" name="guildId" placeholder="Guild ID" />
        <input type="text" name="channelId" placeholder="Channel ID" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
