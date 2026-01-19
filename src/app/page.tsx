"use client";

import { useEffect, useRef, useState } from "react";
import type { AllowedPeople } from "@/types";
import { ProfileOption } from "./components/ProfileOption";

export default function Home() {
  const [selected, setSelected] = useState<AllowedPeople>();
  const introRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reversed, setReversed] = useState(false);
  const [showingIntro, setShowingIntro] = useState(true);

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

  function select(person: AllowedPeople) {
    setSelected(person);
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
      <a
        href="https://discord.com/oauth2/authorize?client_id=1461518757015851111&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fverify&scope=identify"
        className="bg-purple-800 p-10 flex flex-col justify-center items-center gap-3 rounded-2xl fixed -left-125 z-1000"
        style={{
          animation: "slide-in-left 1s ease-out forwards",
          animationDelay: "5s",
        }}
      >
        Log in with Discord
      </a>
    </main>
  );
}
