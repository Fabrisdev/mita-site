"use client";

import { useMitaBackground } from "./hooks/useMitaBackground";

export function MitaBackground() {
  const { introRef, videoRef, showingIntro } = useMitaBackground();

  return (
    <>
      <video
        ref={introRef}
        autoPlay
        muted
        src="/intro.mp4"
        className="z-200 transition w-svw h-svh object-cover"
        style={{
          opacity: showingIntro ? 1 : 0,
        }}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        src="/mita_stand.mp4"
        className="fixed w-svw h-svh object-cover"
        style={{
          opacity: showingIntro ? 0 : 1,
        }}
      />
    </>
  );
}
