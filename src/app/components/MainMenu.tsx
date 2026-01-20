"use client";

import { useEffect, useState } from "react";

export function MainMenu({ children }: { children: React.ReactNode }) {
  const [animatedOnce, setAnimatedOnce] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedOnce(true);
    }, 7000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const animationClass = animatedOnce
    ? "animate-[mobile-fade-in_1s_ease-out_forwards] lg:animate-[custom-slide-in-left_1s_ease-out_forwards]"
    : "animate-[mobile-fade-in_1s_ease-out_5s_forwards] lg:animate-[custom-slide-in-left_1s_ease-out_5s_forwards]";

  return (
    <div
      className={`fixed z-1000 bg-purple-600 p-10 rounded-xl flex flex-col gap-7 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 bg-size-[400%_400%] border-2 border-white lg:left-30 opacity-0 ${animationClass}`}
    >
      {children}
    </div>
  );
}
