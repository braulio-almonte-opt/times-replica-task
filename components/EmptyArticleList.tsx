import ArticleListHeading, {
  type ArticleListVariant,
} from "@/components/ArticleListHeading";
import ArticleListSection from "@/components/ArticleListSection";

interface EmptyArticleListProps {
  title: string;
  variant: ArticleListVariant;
}

export default function EmptyArticleList({
  title,
  variant,
}: EmptyArticleListProps) {
  return (
    <ArticleListSection variant={variant}>
      <ArticleListHeading title={title} variant={variant} empty />
      <div className="w-full rounded-xl border border-border bg-surface p-5 text-center text-foreground-muted">
        {variant === "category"
          ? "No articles in this category yet."
          : "No articles yet."}
      </div>
    </ArticleListSection>
  );
}
