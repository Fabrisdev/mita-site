import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BotService } from "@/bot-service";

type Props = {
  jwt: string;
};

export function TicketLogSection({ jwt }: Props) {
  const params = useParams<{ guildId: string }>();
  const tickets = useQuery({
    queryKey: ["tickets"],
    queryFn: () =>
      BotService.Tickets.all({ session: jwt, guildId: params.guildId }),
  });
  return (
    <div>
      <p>Tickets</p>
    </div>
  );
}
