import { useEffect, useRef, useState } from "react";

export function useMitaBackground() {
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

  return { videoRef, introRef, showingIntro };
}
