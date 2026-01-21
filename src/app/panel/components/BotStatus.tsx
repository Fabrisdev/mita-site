import { GET as checkOk } from "@/app/api/admin/ok/route";

export async function BotStatus() {
  const isOK = await checkOk().then((res) => res.ok);
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="flex justify-center items-center gap-2">
      <span
        className={`font-bold p-2 rounded-xl border-2 ${isOK ? "bg-green-400" : "bg-red-400"}`}
      >
        {isOK ? "ONLINE" : "OFFLINE"}
      </span>
      <i className="text-">(last checked at: {formattedTime})</i>
    </div>
  );
}
