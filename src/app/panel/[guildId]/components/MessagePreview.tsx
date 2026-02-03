import Image from "next/image";
import { discordLikeTimestamp } from "@/app/general/helper";

type Props = {
  message: string;
  user?: {
    name: string;
    sentAt: number;
    icon: string | null;
  };
};

export function MessagePreview({ message, user }: Props) {
  return (
    <div className="bg-[#1a1a1e] p-2 rounded-md flex gap-4 items-start">
      {user ? (
        user.icon ? (
          <img
            src={user.icon}
            alt={`${user.name}'s icon`}
            height={48}
            width={48}
            className="rounded-full"
          />
        ) : (
          <p className="size-12 rounded-full">?</p>
        )
      ) : (
        <Image
          src="/favicon.ico"
          alt="Mita bot's avatar"
          height={48}
          width={48}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col">
        <div className="flex gap-2">
          <p>{user ? user.name : "Mita"}</p>
          {user ? (
            <small className="flex justify-center items-center text-[#7a7b83]">
              {discordLikeTimestamp(user.sentAt)}
            </small>
          ) : (
            <small className="bg-[#5865f2] font-bold rounded-md flex justify-center items-center pl-1 pr-1 h-min">
              APP
            </small>
          )}
        </div>
        <p className="text-gray-200 whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}
