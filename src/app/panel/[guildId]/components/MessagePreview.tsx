type Props = {
  message: string;
};

export function MessagePreview({ message }: Props) {
  return <p>{message}</p>;
}
