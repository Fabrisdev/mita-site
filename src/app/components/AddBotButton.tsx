import Image from "next/image";

export function AddBotButton() {
  return (
    <a
      href="https://discord.com/oauth2/authorize?client_id=1461518757015851111&permissions=8&integration_type=0&scope=bot"
      className="bg-purple-800 p-2 flex justify-center items-center gap-3 rounded-xs hover:bg-pink-500 transition duration-1500 min-w-60 border-2 border-pink-500 animate-heartbeat animate-iteration-count-infinite animate-delay-[8s] animate-duration-3000 relative"
    >
      <Image
        src="/plus.svg"
        alt="Image of a plus symbol"
        width={40}
        height={40}
        className="absolute -top-5 -right-5 rotate-30"
      />
      <p className="font-bold">Add bot to Discord</p>
    </a>
  );
}
