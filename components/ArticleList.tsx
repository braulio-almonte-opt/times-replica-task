import type { Article } from "@/app/types/domainTypes";
import ArticleListHeading, {
  type ArticleListVariant,
} from "@/components/ArticleListHeading";
import ArticleListItem from "@/components/ArticleListItem";
import EmptyArticleList from "@/components/EmptyArticleList";

type EditorialVariant = Exclude<ArticleListVariant, "home">;

interface ArticleListProps {
  articles: readonly Article[];
  title: string;
  variant: ArticleListVariant;
}

export default function ArticleList({
  articles,
  title,
  variant,
}: ArticleListProps) {
  if (articles.length === 0) {
    return <EmptyArticleList title={title} variant={variant} />;
  }

  if (variant === "home") {
    return <HomeArticleList articles={articles} title={title} />;
  }

  return (
    <EditorialArticleList
      articles={articles}
      title={title}
      variant={variant}
    />
  );
}

function HomeArticleList({
  articles,
  title,
}: {
  articles: readonly Article[];
  title: string;
}) {
  return (
    <section aria-labelledby="article-list-heading" className="mt-12">
      <ArticleListHeading title={title} variant="home" />
      <ArticleListItems articles={articles} layout="home" />
    </section>
  );
}

function EditorialArticleList({
  articles,
  title,
  variant,
}: {
  articles: readonly Article[];
  title: string;
  variant: EditorialVariant;
}) {
  return (
    <section
      aria-labelledby="article-list-heading"
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
    >
      <ArticleListHeading title={title} variant={variant} />
      <ArticleListItems articles={articles} layout="editorial" />
    </section>
  );
}

function ArticleListItems({
  articles,
  layout,
}: {
  articles: readonly Article[];
  layout: "home" | "editorial";
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <ul role="list" className="divide-y divide-border">
        {articles.map((article, index) => (
          <ArticleListItem
            key={article.slug}
            article={article}
            layout={layout}
            prioritizeImage={layout === "editorial" && index === 0}
          />
        ))}
      </ul>
    </div>
  );
}
