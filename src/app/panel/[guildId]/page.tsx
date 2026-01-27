import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BotService } from "@/bot-service";
import { AdminPanel } from "./components/AdminPanel";

export default async function AdminPanelPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return redirect("/");
  const guildId = (await params).guildId;
  const currentGuild = await BotService.findGuild({ guildId, session });
  if (currentGuild === undefined) return redirect("/?error=non_existent_guild");
  return <AdminPanel jwt={session.value} />;
}
