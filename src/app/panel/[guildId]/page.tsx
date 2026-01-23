import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminPanel } from "./components/AdminPanel";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function AdminPanelPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return redirect("/");
  const verifyResult = await jwtVerify(session.value, secret);
  const { payload } = verifyResult;
  const { avatar, id, username } = payload;
  return (
    <AdminPanel
      id={id as string}
      username={username as string}
      avatar={avatar as string}
      jwt={session.value}
    />
  );
}
