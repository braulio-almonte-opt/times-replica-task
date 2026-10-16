"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Article } from "@/app/types/domainTypes";

type FeaturedArticle = Pick<Article, "title" | "slug" | "description" | "imageUrl">;

interface FeaturedArticlesProps {
  articles: readonly FeaturedArticle[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
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
  }, [updateScrollControls, articles.length]);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector("li");
    if (!track || !firstCard) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <div>
      {articles.length === 0 ? (
        <p className="rounded-xl border border-neutral-200 bg-white px-5 py-8 text-neutral-600">
          No featured stories right now. Check back soon.
        </p>
      ) : (
        <>
          <ul
            ref={trackRef}
            aria-label="Featured stories"
            className="grid auto-cols-[100%] grid-flow-col gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 sm:auto-cols-[calc(50%-0.5rem)] lg:auto-cols-[calc(33.333%-0.667rem)]"
          >
            {articles.map((article, index) => (
              <li key={article.slug} className="min-w-0 snap-start">
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={article.imageUrl ?? "/images/emptynews.jpg"}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 31vw"
                      loading={index === 0 ? "eager" : undefined}
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-red-700">
                      Featured
                    </p>
                    <h2 className="line-clamp-2 font-serif text-xl font-bold leading-snug group-hover:text-red-800">
                      {article.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">
                      {article.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {(canScrollPrevious || canScrollNext) && (
            <div className="mt-2 flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label="Previous featured stories"
                onClick={() => scroll(-1)}
                disabled={!canScrollPrevious}
                className="grid size-10 place-items-center rounded-full border border-neutral-300 text-xl text-neutral-800 transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-neutral-300 disabled:hover:bg-transparent disabled:hover:text-neutral-800"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className="text-sm font-medium text-neutral-600">
                Explore stories
              </span>
              <button
                type="button"
                aria-label="Next featured stories"
                onClick={() => scroll(1)}
                disabled={!canScrollNext}
                className="grid size-10 place-items-center rounded-full border border-neutral-300 text-xl text-neutral-800 transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-neutral-300 disabled:hover:bg-transparent disabled:hover:text-neutral-800"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
