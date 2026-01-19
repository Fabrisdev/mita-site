import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Home } from "./components/Home";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return <Home initialLoggedIn={false} />;
  const verifyResult = await jwtVerify(session.value, secret).catch(() => null);
  if (verifyResult === null) return <Home initialLoggedIn={false} />;
  const { payload } = verifyResult;
  const { avatar, id, username } = payload;
  return (
    <Home
      initialLoggedIn
      avatar={avatar as string}
      id={id as string}
      username={username as string}
    />
  );
}
