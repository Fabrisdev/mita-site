import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminPanel } from "./components/AdminPanel";

export default async function AdminPanelPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return redirect("/");

  return <AdminPanel jwt={session.value} />;
}
