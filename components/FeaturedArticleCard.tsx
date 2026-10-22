import Image from "next/image";
import Link from "next/link";

export interface FeaturedArticleCardData {
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
}

interface FeaturedArticleCardProps {
  article: FeaturedArticleCardData;
  prioritizeImage: boolean;
}

export default function ArticleCard({
  article,
  prioritizeImage,
}: FeaturedArticleCardProps) {
  return (
    <li className="min-w-0 snap-start">
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
            loading={prioritizeImage ? "eager" : undefined}
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
  );
}