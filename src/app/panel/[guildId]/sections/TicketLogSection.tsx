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
  return data.map((ticket) => (
    <div key={ticket._id}>
      <ul className="list-disc">
        <li>
          <strong>ID</strong>: {ticket._id}
        </li>
        <li>
          <strong>Opened by</strong>: {ticket.ownerId}
        </li>
        <li>
          <strong>Status</strong>: {ticket.status}
        </li>
      </ul>
      <div>
        {ticket.messages.map((message) => (
          <div key={message._id}>{message.content}</div>
        ))}
      </div>
    </div>
  ));
}
