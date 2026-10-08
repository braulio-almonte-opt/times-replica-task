import Link from "next/link";
import type { Article } from "@/data/articles";

interface ArticleListProps {
  articles: readonly Article[];
  title: string;
}

export default function ArticleList({ articles, title }: ArticleListProps) {
  return (
    <section className="flex flex-col justify-center items-center p-4 bg-amber-gray-50">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex flex-1 bg-amber-50 p-4 rounded-lg shadow-lg">
        <ul role="list">
          {articles.map((article) => (
            <li
              key={article.id}
              className="flex py-4 text-blue-500 hover:underline first:pt-0 last:pb-0"
            >
              <Link href={`/articles/${article.slug}`}>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-gray-900">{article.title}</p>
                  <p className="text-sm text-gray-500">{article.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
