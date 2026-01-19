import { GET as checkOk } from "@/app/api/admin/ok/route";

export async function BotStatus() {
  const isOK = await checkOk().then((res) => res.ok);
  return (
    <span
      className={`w-40 h-20 font-bold p-2 rounded-xs ${isOK ? "bg-green-400" : "bg-red-400"}`}
    >
      {isOK ? "ONLINE" : "OFFLINE"}
    </span>
  );
}
