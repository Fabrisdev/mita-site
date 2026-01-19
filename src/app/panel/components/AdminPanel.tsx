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
    </div>
  );
}
