type Props = {
  jwt: string;
  message: string;
};

export function MessagePreview({ jwt, message }: Props) {
  return <p>{message}</p>;
}
