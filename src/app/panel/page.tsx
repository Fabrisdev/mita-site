import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BotService } from "@/bot-service";
import { MitaHomeButton } from "@/icons/MitaHomeButton";
import { ServerWithBotCard } from "./components/ServerWithBotCard";
import { ServerWithoutBotCard } from "./components/ServerWithoutBotCard";

export default async function ChooseServerPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return redirect("/");
  const guilds = await BotService.servers({ session });
  return (
    <div className="flex flex-col gap-5 bg-[#121214] min-h-svh">
      <header className="bg-[#1a1a1e] flex justify-center items-center p-4 w-full border-b border-[#2e2e33] relative">
        <MitaHomeButton />
        <p>Server selector</p>
      </header>
      <h1 className="text-3xl text-center font-bold">Choose a server</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-6">
        {guilds.map((guild, i) => (
          <ServerWithBotCard key={guild.id} guild={guild} i={i} />
        ))}
      </ul>
      <hr className="border-[#2e2e33]" />
      <h2 className="text-xl text-center font-bold">Other servers you're in</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-6">
        {guilds.map((guild) => (
          <ServerWithoutBotCard key={guild.id} guild={guild} />
        ))}
      </ul>
    </div>
  );
}
