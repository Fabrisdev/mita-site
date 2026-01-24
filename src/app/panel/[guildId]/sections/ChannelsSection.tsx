import { SendMessageForm } from "../components/SendMessageForm";

type Props = {
  jwt: string;
};

export function ChannelsSection({ jwt }: Props) {
  return (
    <div>
      <SendMessageForm jwt={jwt} />
    </div>
  );
}
