import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import type { Article } from "@/app/types/cmsTypes";
import { formatArticle } from "@/scripts/objectParser";

interface FeaturedArticlesProps {
  articles: readonly Article[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {

  const formattedArticles = articles.map((article) => (
    formatArticle(article)
  ))
  return (
    <div className="flex flex-row justify-center items-start h-auto">
      {formattedArticles.map((article) => (
        <div
          key={article.slug}
          className="flex flex-col justify-center items-center w-1/3 h-150 p-4 m-5 bg-amber-50 rounded-lg shadow-md"
        >
          <ArticleCard
            title={article.title}
            description={article.description}
            imageUrl={article.imageUrl ?? "/images/emptynews.jpg"}
          />
          <Link href={`/articles/${article.slug}`} className="text-blue-500 mt-2">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}
