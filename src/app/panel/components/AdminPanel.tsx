import { GET as checkOk } from "@/app/api/admin/ok/route";
import { LoggedInAsPopup } from "@/auth/components/LoggedInAsPopup";

type Props = {
  username: string;
  id: string;
  avatar: string;
};

export async function AdminPanel({ username, id, avatar }: Props) {
  const isOK = await checkOk().then((res) => res.ok);

  return (
    <div>
      <span
        className={`w-40 h-20 font-bold p-2 rounded-xs ${isOK ? "bg-green-400" : "bg-red-400"}`}
      >
        {isOK ? "ONLINE" : "OFFLINE"}
      </span>
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
