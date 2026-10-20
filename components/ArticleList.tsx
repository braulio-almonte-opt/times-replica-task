import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/app/types/domainTypes";

interface ArticleListProps {
  articles: readonly Article[];
  title: string;
  variant: "home" | "category" | "author";
}

export default function ArticleList({
  articles,
  title,
  variant,
}: ArticleListProps) {
  const isHome = variant === "home";
  const isCategory = variant === "category";
  const isAuthor = variant === "author";

  if (articles.length === 0) {
    return (
      <section
        aria-labelledby="article-list-heading"
        className={isHome ? "mt-12" : "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"}
      >
        {isCategory ? (
          <h1
            id="article-list-heading"
            className="mb-6 text-center font-serif text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {title}
          </h1>
        ) : isAuthor ? (
          <h2
            id="article-list-heading"
            className="mb-6 text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
        ) : (
          <h2
            id="article-list-heading"
            className="mb-4 font-serif text-2xl font-bold"
          >
            {title}
          </h2>
        )}
        <div className="w-full rounded-xl border border-border bg-surface p-5 text-center text-foreground-muted">
          {isCategory ? "No articles in this category yet." : "No articles yet."}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="article-list-heading"
      className={isHome ? "mt-12" : "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"}
    >
      <div
        className={
          isHome
            ? "mb-4 flex w-full items-end justify-between border-b border-border-strong pb-3"
            : "mb-6"
        }
      >
        {isCategory ? (
          <h1
            id="article-list-heading"
            className="text-center font-serif text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {title}
          </h1>
        ) : isAuthor ? (
          <h2
            id="article-list-heading"
            className="text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
        ) : (
          <h2 id="article-list-heading" className="font-serif text-2xl font-bold">
            {title}
          </h2>
        )}
        {isHome && (
          <span className="hidden text-sm text-foreground-subtle sm:block">
            More from TIME
          </span>
        )}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <ul role="list" className="divide-y divide-border">
          {articles.map((article, index) => (
            <li key={article.slug} className="group">
              <Link
                href={`/articles/${article.slug}`}
                className={
                  isHome
                    ? "flex flex-col gap-4 p-4 transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-2 focus-visible:outline-accent sm:flex-row sm:items-center sm:gap-5 sm:px-5"
                    : "flex flex-col gap-3 p-4 transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-2 focus-visible:outline-accent sm:flex-row sm:items-center sm:gap-5 sm:px-5"
                }
              >
                <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-md bg-placeholder sm:aspect-square sm:w-28">
                  <Image
                    src={article.imageUrl ?? "/images/emptynews.jpg"}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 100vw, 112px"
                    loading={
                      (isCategory || isAuthor) && index === 0
                        ? "eager"
                        : undefined
                    }
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-bold leading-snug text-foreground group-hover:text-accent-hover">
                    {article.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-foreground-muted">
                    {article.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
