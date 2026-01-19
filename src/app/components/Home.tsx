"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props =
  | {
      initialLoggedIn: true;
      id: string;
      avatar: string;
      username: string;
    }
  | {
      initialLoggedIn: false;
      id?: never;
      avatar?: never;
      username?: never;
    };

export function Home({ initialLoggedIn, avatar }: Props) {
  const introRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reversed, setReversed] = useState(false);
  const [showingIntro, setShowingIntro] = useState(true);
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setShowingIntro(false);
    }, 5000);
  }, []);

  function playVideoBackwards(video: HTMLVideoElement) {
    const fps = 30;
    const intervalRewind = setInterval(() => {
      if (video.currentTime <= 0.05) {
        clearInterval(intervalRewind);
        video.currentTime = 0;
        setReversed(false);
      } else {
        video.currentTime += -(1 / fps);
      }
    }, 1000 / fps);
  }

  useEffect(() => {
    const bg = new Audio("/bg-music.mp3");
    bg.loop = true;
    bg.play();
    return () => {
      bg.pause();
    };
  }, []);

  useEffect(() => {
    if (showingIntro) return;
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!reversed && video.currentTime >= video.duration - 0.05) {
        setReversed(true);
      }

      if (reversed && video.currentTime <= 0.05) {
        setReversed(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [reversed, showingIntro]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: playVideoBackwards function should not be a dependency
  useEffect(() => {
    if (showingIntro) return;
    const video = videoRef.current;
    if (!video) return;

    if (reversed) {
      playVideoBackwards(video);
      return;
    }
    video.play();
  }, [reversed, showingIntro]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setLoggedIn(false);
  }

  return (
    <main className="h-svh flex justify-center items-center bg-cover">
      <video
        ref={introRef}
        autoPlay
        muted
        src="/intro.mp4"
        className="z-200 transition"
        style={{
          opacity: showingIntro ? 1 : 0,
        }}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        src="/mita_stand.mp4"
        className="fixed"
        style={{
          opacity: showingIntro ? 0 : 1,
        }}
      />
      <div
        className="fixed -left-125 animation-delay-[5s] z-1000 bg-purple-600 p-10 rounded-xl flex flex-col gap-7 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 bg-size-[400%_400%] border-2 border-white"
        style={{
          animation: `
            custom-slide-in-left 1s ease-out 5s forwards,
            bg-shift 6s linear 6s infinite
          `,
          animationDelay: "5s",
        }}
      >
        <Image
          src="/miside-logo.webp"
          alt="Miside logo"
          width={300}
          height={77}
        />
        <a
          href="https://discord.com/oauth2/authorize?client_id=1461518757015851111&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fverify&scope=identify"
          className="bg-purple-800 p-2 flex justify-center items-center gap-3 rounded-xs hover:bg-pink-500 transition duration-1500 min-w-60 border-2 border-pink-500 animate-heartbeat animate-iteration-count-infinite animate-delay-[6s] animate-duration-3000 relative"
        >
          <Image
            src="/discord.svg"
            alt="Discord logo"
            width={40}
            height={40}
            className="absolute -top-5 -left-5 -rotate-30"
          />
          <p className="font-bold">
            {loggedIn ? "Go to admin panel" : "Log in with Discord"}
          </p>
        </a>
        {loggedIn && (
          <button
            type="button"
            className="bg-purple-800 p-2 flex justify-center items-center gap-3 rounded-xs hover:bg-pink-500 transition duration-1500 min-w-60 border-2 border-pink-500 animate-heartbeat animate-iteration-count-infinite animate-delay-[7s] animate-duration-3000 font-bold cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </main>
  );
}
