export type ArticleListVariant = "home" | "category" | "author";

interface ArticleListHeadingProps {
  title: string;
  variant: ArticleListVariant;
  empty?: boolean;
}

export default function ArticleListHeading({
  title,
  variant,
  empty = false,
}: ArticleListHeadingProps) {
  const HeadingTag = variant === "category" ? "h1" : "h2";
  const headingClassName =
    variant === "category"
      ? "text-center font-serif text-4xl font-bold tracking-tight sm:text-5xl"
      : variant === "author"
        ? "text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl"
        : empty
          ? "mb-4 font-serif text-2xl font-bold"
          : "font-serif text-2xl font-bold";

  if (variant === "home" && !empty) {
    return (
      <div className="mb-4 flex w-full items-end justify-between border-b border-border-strong pb-3">
        <HeadingTag id="article-list-heading" className={headingClassName}>
          {title}
        </HeadingTag>
        <span className="hidden text-sm text-foreground-subtle sm:block">
          More from TIME
        </span>
      </div>
    );
  }

  return (
    <div className={variant === "home" ? "" : "mb-6"}>
      <HeadingTag id="article-list-heading" className={headingClassName}>
        {title}
      </HeadingTag>
    </div>
  );
}
