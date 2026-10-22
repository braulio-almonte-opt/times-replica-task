import type { Article } from "@/app/types/domainTypes";
import ArticleListHeading, {
  type ArticleListVariant,
} from "@/components/ArticleListHeading";
import ArticleListItem from "@/components/ArticleListItem";
import ArticleListSection from "@/components/ArticleListSection";
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
    <ArticleListSection variant="home">
      <ArticleListHeading title={title} variant="home" />
      <ArticleListItems articles={articles}/>
    </ArticleListSection>
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
    <ArticleListSection variant={variant}>
      <ArticleListHeading title={title} variant={variant} />
      <ArticleListItems articles={articles}/>
    </ArticleListSection>
  );
}

function ArticleListItems({
  articles,
}: {
  articles: readonly Article[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <ul role="list" className="divide-y divide-border">
        {articles.map((article, index) => (
          <ArticleListItem
            key={article.slug}
            article={article}
            prioritizeImage={index === 0}
          />
        ))}
      </ul>
    </div>
  );
}
