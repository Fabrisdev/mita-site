import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { BOT_API_URL } from "./consts";

export namespace BotService {
  export async function isOnline() {
    return await fetch(`${BOT_API_URL}/status/ok`)
      .then((res) => res.ok)
      .catch(() => false);
  }

  export async function servers({ session }: { session: Session }) {
    return (await fetch(`${BOT_API_URL}/guild`, {
      headers: {
        Authorization: `Bearer ${getToken(session)}`,
      },
    }).then((res) => res.json())) as Guild[];
  }

  export async function findGuild({
    guildId,
    session,
  }: {
    guildId: string;
    session: Session;
  }) {
    const guilds = await BotService.servers({ session });
    return guilds.find((guild) => guild.id === guildId);
  }

  export async function send({
    guildId,
    message,
    channelId,
    session,
  }: {
    guildId: string;
    message: string;
    channelId: string;
    session: Session;
  }) {
    return await fetch(`${BOT_API_URL}/${guildId}/channel/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken(session)}`,
      },
      body: JSON.stringify({ message, channelId }),
    });
  }
}

export type Guild = {
  name: string;
  id: string;
  icon?: string;
  banner?: string;
  memberCount: number;
  highestRole: string;
};

export type SendBody = {
  message: string;
  channelId: string;
};

type Session = RequestCookie | string;

function getToken(session: Session) {
  return typeof session === "string" ? session : session.value;
}
