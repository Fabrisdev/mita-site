import { BOT_API_URL } from "./consts";

export namespace BotService {
  export async function isOnline() {
    return await fetch(`${BOT_API_URL}/status/ok`)
      .then((res) => res.ok)
      .catch(() => false);
  }
}
