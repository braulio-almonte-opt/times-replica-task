import ArticleListHeading, {
  type ArticleListVariant,
} from "@/components/ArticleListHeading";

interface EmptyArticleListProps {
  title: string;
  variant: ArticleListVariant;
}

export default function EmptyArticleList({
  title,
  variant,
}: EmptyArticleListProps) {
  return (
    <section
      aria-labelledby="article-list-heading"
      className={
        variant === "home"
          ? "mt-12"
          : "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
      }
    >
      <ArticleListHeading title={title} variant={variant} empty />
      <div className="w-full rounded-xl border border-border bg-surface p-5 text-center text-foreground-muted">
        {variant === "category"
          ? "No articles in this category yet."
          : "No articles yet."}
      </div>
    </section>
  );
}
