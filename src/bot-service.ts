import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { BOT_API_URL } from "./consts";

export namespace BotService {
  export async function isOnline() {
    return await fetch(`${BOT_API_URL}/status/ok`)
      .then((res) => res.ok)
      .catch(() => false);
  }

  export async function servers({ session }: { session: RequestCookie }) {
    return (await fetch(`${BOT_API_URL}/guild`, {
      headers: {
        Authorization: `Bearer ${session.value}`,
      },
    }).then((res) => res.json())) as {
      name: string;
      id: string;
      icon: string;
    }[];
  }
}
