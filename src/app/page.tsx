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
      <form
        action=""
        className="bg-purple-800 p-10 flex flex-col justify-center items-center gap-3 rounded-2xl fixed left-30 z-1000"
      >
        <p className="text-2xl font-bold">Please choose who you are</p>
        <div className="flex flex-col gap-2">
          <ProfileOption
            name="light"
            onClick={() => setReversed(!reversed)}
            selected={selected === "light"}
          />
          <ProfileOption
            name="pandita"
            onClick={() => select("pandita")}
            selected={selected === "pandita"}
          />
          <ProfileOption
            name="pau"
            onClick={() => select("pau")}
            selected={selected === "pau"}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-pink-500 p-2 w-full cursor-pointer hover:bg-pink-600 rounded-xs"
        />
      </form>
    </main>
  );
}
