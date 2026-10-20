import { notFound } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";
import ArticleList from "@/components/ArticleList";
import CustomFooter from "@/components/CustomFooter";
import { getArticlesByCategory, getCategoryBySlug } from "@/app/lib/queries";
import { ContentstackRequestError } from "@/app/lib/cs_data";
import ContentstackUnavailable from "@/components/ContentstackUnavailable";
import { formatArticle } from "@/scripts/objectParser";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}

const PAGE_SIZE = 5;

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const [{ slug }, { page: requestedPage }] = await Promise.all([params, searchParams]);

  let category: Awaited<ReturnType<typeof getCategoryBySlug>> = null;
  let cmsUnavailable = false;
  try {
    category = await getCategoryBySlug(slug);
  } catch (error) {
    if (!(error instanceof ContentstackRequestError)) throw error;
    console.error(`Unable to load category "${slug}" because Contentstack is unavailable:`, error);
    cmsUnavailable = true;
  }
  if (cmsUnavailable) return <ContentstackUnavailable />;

  if (!category) {
    return notFound();
  }

  const pageValue = Array.isArray(requestedPage) ? undefined : requestedPage;
  const parsedPage = pageValue && /^\d+$/.test(pageValue) ? Number(pageValue) : 1;
  if (!Number.isSafeInteger(parsedPage) || parsedPage < 1) {
    return notFound();
  }

  const skippedArticles = (parsedPage - 1) * PAGE_SIZE;
  let articlePage: Awaited<ReturnType<typeof getArticlesByCategory>> = null;
  try {
    articlePage = await getArticlesByCategory(
      category.slug,
      skippedArticles,
      PAGE_SIZE,
    );
  } catch (error) {
    if (!(error instanceof ContentstackRequestError)) throw error;
    console.error(`Unable to load category "${slug}" articles because Contentstack is unavailable:`, error);
    cmsUnavailable = true;
  }
  if (cmsUnavailable) return <ContentstackUnavailable />;

  const totalArticles = articlePage?.total ?? 0;
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE);
  if (totalPages > 0 && parsedPage > totalPages) {
    return notFound();
  }

  const pageArticles = (articlePage?.articles ?? []).map(formatArticle);

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-neutral-950">
      <Banner showSignup={true}/>
      <main className="w-full flex-1">
        <ArticleList
          title={category.title}
          articles={pageArticles}
          variant="category"
        />
        {totalPages > 0 && (
          <nav
            aria-label="Category article pages"
            className="mx-auto flex w-full max-w-5xl items-center justify-center gap-5 px-4 pb-10 sm:px-6"
          >
            {parsedPage > 1 ? (
              <Link
                href={`/category/${category.slug}?page=${parsedPage - 1}`}
                className="rounded-full border border-neutral-300 px-5 py-2 font-semibold text-neutral-800 transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              >
                Previous
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-full border border-neutral-200 px-5 py-2 font-semibold text-neutral-400">
                Previous
              </span>
            )}
            <span
              aria-current="page"
              className="whitespace-nowrap font-medium text-neutral-700"
            >
              Page {parsedPage} of {totalPages}
            </span>
            {parsedPage < totalPages ? (
              <Link
                href={`/category/${category.slug}?page=${parsedPage + 1}`}
                className="rounded-full border border-neutral-300 px-5 py-2 font-semibold text-neutral-800 transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              >
                Next
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-full border border-neutral-200 px-5 py-2 font-semibold text-neutral-400">
                Next
              </span>
            )}
          </nav>
        )}
      </main>
      <CustomFooter />
    </div>
  );
}
