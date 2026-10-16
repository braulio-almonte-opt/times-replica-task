import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/app/types/domainTypes";

interface ArticleListProps {
  articles: readonly Article[];
  title: string;
  variant?: "default" | "home" | "category" | "author";
}

export default function ArticleList({
  articles,
  title,
  variant = "default",
}: ArticleListProps) {
  const isHome = variant === "home";
  const isCategory = variant === "category";
  const isAuthor = variant === "author";
  const hasThumbnails = isHome || isCategory || isAuthor;
  const isEditorialList = isCategory || isAuthor;

  if (articles.length === 0) {
    return (
      <section
        aria-labelledby="article-list-heading"
        className={
          isHome
            ? "mt-12"
            : isEditorialList
              ? "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
              : "flex flex-col items-center p-4"
        }
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
        <div className="w-full rounded-xl border border-neutral-200 bg-white p-5 text-neutral-600">
          No articles yet.
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="article-list-heading"
      className={
        isHome
          ? "mt-12"
          : isEditorialList
            ? "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
            : "flex flex-col items-center p-4"
      }
    >
      <div
        className={
          isEditorialList
            ? "mb-6"
            : "mb-4 flex w-full items-end justify-between border-b border-neutral-300 pb-3"
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
          <span className="hidden text-sm text-neutral-500 sm:block">
            More from TIME
          </span>
        )}
      </div>
      <div
        className={
          isHome
            ? "overflow-hidden rounded-xl border border-neutral-200 bg-white"
            : isEditorialList
              ? "overflow-hidden rounded-xl border border-neutral-200 bg-white"
              : "rounded-lg bg-amber-50 p-4 shadow-lg"
        }
      >
        <ul
          role="list"
          className={hasThumbnails ? "divide-y divide-neutral-200" : ""}
        >
          {articles.map((article, index) => (
            <li
              key={article.slug}
              className={
                hasThumbnails
                  ? "group"
                  : "flex py-4 text-blue-500 first:pt-0 last:pb-0 hover:underline"
              }
            >
              <Link
                href={`/articles/${article.slug}`}
                className={
                  isHome
                    ? "flex flex-col gap-4 p-4 transition-colors hover:bg-stone-50 focus-visible:bg-stone-50 focus-visible:outline-2 focus-visible:outline-red-700 sm:flex-row sm:items-center sm:gap-5 sm:px-5"
                    : isEditorialList
                      ? "flex flex-col gap-3 p-4 transition-colors hover:bg-stone-50 focus-visible:bg-stone-50 focus-visible:outline-2 focus-visible:outline-red-700 sm:flex-row sm:items-center sm:gap-5 sm:px-5"
                      : ""
                }
              >
                {hasThumbnails && (
                  <div
                    className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-md bg-neutral-200 sm:aspect-square sm:w-28"
                  >
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
                )}
                <div
                  className={
                    hasThumbnails ? "min-w-0 flex-1" : "ml-3 overflow-hidden"
                  }
                >
                  <p
                    className={
                      hasThumbnails
                        ? "font-serif text-lg font-bold leading-snug text-neutral-950 group-hover:text-red-800"
                        : "text-sm font-medium text-gray-900"
                    }
                  >
                    {article.title}
                  </p>
                  <p
                    className={
                      hasThumbnails
                        ? "mt-1 line-clamp-2 text-sm leading-6 text-neutral-600"
                        : "text-sm text-gray-500"
                    }
                  >
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
