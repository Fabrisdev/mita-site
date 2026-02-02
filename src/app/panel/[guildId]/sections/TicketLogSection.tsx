import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BotService } from "@/bot-service";

type Props = {
  jwt: string;
};

export function TicketLogSection({ jwt }: Props) {
  const params = useParams<{ guildId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () =>
      BotService.Tickets.all({ session: jwt, guildId: params.guildId }),
  });
  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>Nobody has made a ticket yet.</p>;
  return (
    <div>
      <p>Tickets</p>
      <div>
        {data.map((ticket) => (
          <ul key={ticket._id}>
            <p>ID: {ticket._id}</p>
            <p>Opened by: {ticket.ownerId}</p>
            <p>Status: {ticket.status}</p>
          </ul>
        ))}
      </div>
    </div>
  );
}
