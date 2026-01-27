import { useQuery } from "@tanstack/react-query";
import { BotService } from "@/bot-service";

export function useBotStatus() {
  const { data, isFetching, isFetched, dataUpdatedAt } = useQuery({
    queryKey: ["bot-status"],
    queryFn: BotService.isOnline,
    refetchInterval: 100_000,
  });
  return { isOnline: data, isFetching, isFetched, updatedAt: dataUpdatedAt };
}
