"use client";

import { useCallback, useEffect, useRef, useState } from "react";

//This was AI asisted, just in case

export default function useCarousel(itemCount: number) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollPrevious(track.scrollLeft > 1);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollControls();
    track.addEventListener("scroll", updateScrollControls, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollControls);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateScrollControls);
      resizeObserver.disconnect();
    };
  }, [itemCount, updateScrollControls]);

  const scroll = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector("li");
    if (!track || !firstCard) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: "auto",
    });
  }, []);

  return {
    trackRef,
    canScrollPrevious,
    canScrollNext,
    scroll,
  };
}
