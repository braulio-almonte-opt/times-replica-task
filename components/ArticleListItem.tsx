import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/app/types/domainTypes";

interface ArticleListItemProps {
  article: Article;
  prioritizeImage: boolean;
}

export default function ArticleListItem({
  article,
  prioritizeImage,
}: ArticleListItemProps) {
  return (
    <li className="group">
      <Link
        href={`/articles/${article.slug}`}
        className={`flex flex-col p-4 transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-2 focus-visible:outline-accent sm:flex-row sm:items-center sm:gap-5 sm:px-5 gap-4`}
      >
        <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-md bg-placeholder sm:aspect-square sm:w-28">
          <Image
            src={article.imageUrl ?? "/images/emptynews.jpg"}
            alt=""
            fill
            sizes="(max-width: 639px) 100vw, 112px"
            loading={prioritizeImage ? "eager" : undefined}
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
  );
}
