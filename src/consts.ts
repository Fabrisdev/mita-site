export const BOT_API_URL = "https://pauisdev.ddns.net/api";
export const DISCORD_CLIENT_ID = "1461518757015851111";
export const DISCORD_REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://mita-bot.fabris.dev/api/verify"
    : "http://localhost:3000/api/verify";
