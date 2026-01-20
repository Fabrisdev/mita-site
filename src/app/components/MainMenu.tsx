export function MainMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed -left-125 animation-delay-[5s] z-1000 bg-purple-600 p-10 rounded-xl flex flex-col gap-7 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 bg-size-[400%_400%] border-2 border-white animate-[custom-slide-in-left_1s_ease-out_5s_forwards] animate-delay-5000">
      {children}
    </div>
  );
}
