import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BotService } from "@/bot-service";
import { MessagePreview } from "../components/MessagePreview";

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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] flex-col gap-2">
      {data.map((ticket) => (
        <div
          key={ticket._id}
          className="border p-2 rounded-md border-[#28282c] bg-[#121214] flex flex-col gap-2"
        >
          <small className="text-[#7a7b83] text-center">{ticket._id}</small>
          <ul className="list-disc list-inside">
            <li>
              <strong>Opened by</strong>: {ticket.ownerId}
            </li>
            <li>
              <strong>Status</strong>: {ticket.status}
            </li>
          </ul>
          <div className="border rounded-md border-[#28282c]">
            {ticket.messages.length === 0 ? (
              <MessagePreview message="This ticket got closed without any messages sent." />
            ) : (
              ticket.messages
                .toReversed()
                .map((message) => (
                  <MessagePreview
                    key={message._id}
                    message={message.content}
                    user={{ ...message.user, sentAt: message.sentAt }}
                  />
                ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
