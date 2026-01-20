import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Home } from "./components/Home";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const error =
    params.error && typeof params.error === "string" ? params.error : undefined;
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return <Home loggedIn={false} error={error} />;
  const verifyResult = await jwtVerify(session.value, secret).catch(() => null);
  if (verifyResult === null) return <Home loggedIn={false} error={error} />;
  const { payload } = verifyResult;
  const { avatar, id, username } = payload;
  return (
    <Home
      loggedIn
      avatar={avatar as string}
      id={id as string}
      username={username as string}
      error={error}
    />
  );
}
