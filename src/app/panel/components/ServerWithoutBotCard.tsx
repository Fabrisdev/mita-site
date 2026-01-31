import type { Guild } from "@/bot-service";

export function ServerWithoutBotCard({ guild }: { guild: Guild }) {
  const iconUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
  const bannerUrl = `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}`;

  return (
    <li
      key={guild.id}
      className="flex justify-center items-center gap-5 flex-col min-w-[90%] p-4 rounded-md border border-[#2e2e33] shadow-lg shadow-black bg-[#1a1a1e]"
    >
      <p className="font-bold">{guild.name}</p>
      <div className="w-full rounded-md flex justify-center items-center p-2 border border-[#2e2e33] bg-cover relative overflow-hidden">
        <div
          className="absolute w-full h-full bg-cover z-10 rounded-md blur-sm"
          style={{
            backgroundImage: `url(${guild.banner ? bannerUrl : iconUrl})`,
          }}
        ></div>
        <img
          src={iconUrl}
          alt={`${guild.name}'s server`}
          width={96}
          height={96}
          className="rounded-full z-20"
        />
      </div>
      <a
        href={`/panel/${guild.id}`}
        className="border border-[#2e2e33] w-full text-center rounded-md p-2 font-bold hover:bg-[hsl(var(--h)_100%_12%)] hover:scale-105 transition"
      >
        <p>Add to server</p>
      </a>
    </li>
  );
}
