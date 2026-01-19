import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoggedInAsPopup } from "@/auth/components/LoggedInAsPopup";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function AdminPanelPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return redirect("/");
  const verifyResult = await jwtVerify(session.value, secret);
  const { payload } = verifyResult;
  const { avatar, id, username } = payload;
  return (
    <div>
      <LoggedInAsPopup
        avatar={avatar as string}
        id={id as string}
        username={username as string}
      />
    </div>
  );
}
