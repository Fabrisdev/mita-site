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
    </>
  );
}
