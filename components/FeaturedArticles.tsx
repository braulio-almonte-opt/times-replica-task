"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/app/types/domainTypes";
import useCarousel from "@/components/useCarousel";

type FeaturedArticle = Pick<Article, "title" | "slug" | "description" | "imageUrl">;

interface FeaturedArticlesProps {
  articles: readonly FeaturedArticle[];
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
              <li key={article.slug} className="min-w-0 snap-start">
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-placeholder">
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
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      Featured
                    </p>
                    <h2 className="line-clamp-2 font-serif text-xl font-bold leading-snug group-hover:text-accent-hover">
                      {article.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-foreground-muted">
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
