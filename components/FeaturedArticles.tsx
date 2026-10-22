"use client";

import FeaturedArticleCard, { type FeaturedArticleCardData } from "@/components/FeaturedArticleCard";
import useCarousel from "@/components/useCarousel";

interface FeaturedArticlesProps {
  articles: readonly FeaturedArticleCardData[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const { trackRef, canScrollPrevious, canScrollNext, scroll } = useCarousel(
    articles.length,
  );

  return (
    <div>
      {articles.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface px-5 py-8 text-foreground-muted">
          No featured stories right now. Check back soon.
        </p>
      ) : (
        <>
          <ul
            ref={trackRef}
            aria-label="Featured stories"
            className="grid auto-cols-[100%] grid-flow-col gap-4 overflow-x-auto motion-safe:scroll-smooth motion-reduce:scroll-auto snap-x snap-mandatory pb-3 sm:auto-cols-[calc(50%-0.5rem)] lg:auto-cols-[calc(33.333%-0.667rem)]"
          >
            {articles.map((article, index) => (
              <FeaturedArticleCard
                key={article.slug}
                article={article}
                prioritizeImage={index === 0}
              />
            ))}
          </ul>
          {(canScrollPrevious || canScrollNext) && (
            <div className="mt-2 flex items-center justify-center gap-5">
              <button
                type="button"
                aria-label="Previous featured stories"
                onClick={() => scroll(-1)}
                disabled={!canScrollPrevious}
                className="grid size-10 place-items-center rounded-full border border-border-strong text-xl text-foreground-secondary transition-colors hover:border-foreground hover:bg-foreground hover:text-inverse disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-foreground-secondary"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className="text-sm font-medium text-foreground-muted">
                Explore stories
              </span>
              <button
                type="button"
                aria-label="Next featured stories"
                onClick={() => scroll(1)}
                disabled={!canScrollNext}
                className="grid size-10 place-items-center rounded-full border border-border-strong text-xl text-foreground-secondary transition-colors hover:border-foreground hover:bg-foreground hover:text-inverse disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-foreground-secondary"
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
