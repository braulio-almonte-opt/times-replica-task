import type { ReactNode } from "react";
import type { ArticleListVariant } from "@/components/ArticleListHeading";

interface ArticleListSectionProps {
  children: ReactNode;
  variant: ArticleListVariant;
}

export default function ArticleListSection({
  children,
  variant,
}: ArticleListSectionProps) {
  return (
    <section
      aria-labelledby="article-list-heading"
      className={
        variant === "home"
          ? "mt-12"
          : "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
      }
    >
      {children}
    </section>
  );
}
