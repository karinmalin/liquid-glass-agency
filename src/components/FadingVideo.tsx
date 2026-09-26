import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: CSSProperties;
}

const FADE_IN_MS = 500;
const FADE_OUT_MS = 550;
const FADE_OUT_LEAD_S = 0.55;

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const opacityRef = useRef(0);
  const fadingOutRef = useRef(false);
  const sources = Array.isArray(src) ? src : [src];
  const [index, setIndex] = useState(0);

  const animateOpacity = useCallback((target: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    const from = opacityRef.current;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const value = from + (target - from) * t;
      opacityRef.current = value;
      video.style.opacity = String(value);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      fadingOutRef.current = false;
      animateOpacity(1, FADE_IN_MS);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT_LEAD_S) {
        fadingOutRef.current = true;
        animateOpacity(0, FADE_OUT_MS);
      }
    };

    const handleEnded = () => {
      if (sources.length <= 1) {
        video.currentTime = 0;
        void video.play().catch(() => {});
        fadingOutRef.current = false;
        animateOpacity(1, FADE_IN_MS);
      } else {
        setIndex((i) => (i + 1) % sources.length);
      }
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If data is already loaded (cached), fade in right away
    if (video.readyState >= 2) handleLoaded();

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [animateOpacity, sources.length, index]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      key={sources[index]}
      src={sources[index]}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
