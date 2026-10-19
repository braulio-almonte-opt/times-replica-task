import { notFound } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";
import ArticleList from "@/components/ArticleList";
import CustomFooter from "@/components/CustomFooter";
import { getArticlesByCategory, getCategoryBySlug } from "@/app/lib/queries";
import { ContentstackRequestError } from "@/app/lib/cs_data";
import ContentstackUnavailable from "@/components/ContentstackUnavailable";
import { formatArticle } from "@/scripts/objectParser";
import NoArticles from "@/components/NoArticles";

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

  if (!articlePage || articlePage.total === 0) {
    return (
      <NoArticles title="No discoveries in this field." description="No articles from this category yet."/>
    );
  }

  const totalPages = Math.ceil(articlePage.total / PAGE_SIZE);
  if (parsedPage > totalPages) {
    return notFound();
  }

  const pageArticles = articlePage.articles.map(formatArticle);

  return (
    <>
      <Banner />
      <div className="flex justify-center items-start">
        <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
      </div>
      <div className="flex justify-center items-start">
        <p className="text-lg mt-2">Today&apos;s Headlines</p>
      </div>
      <ArticleList title={`${category.title} articles`} articles={pageArticles} />
      <nav aria-label="Category article pages" className="flex justify-center items-center gap-4 p-4">
        {parsedPage > 1 ? (
          <Link
            href={`/category/${category.slug}?page=${parsedPage - 1}`}
            className="text-blue-500 hover:underline"
          >
            Previous
          </Link>
        ) : (
          <span className="text-gray-400">Previous</span>
        )}
        <span aria-current="page">Page {parsedPage} of {totalPages}</span>
        {parsedPage < totalPages ? (
          <Link
            href={`/category/${category.slug}?page=${parsedPage + 1}`}
            className="text-blue-500 hover:underline"
          >
            Next
          </Link>
        ) : (
          <span className="text-gray-400">Next</span>
        )}
      </nav>
      <div className="flex flex-col items-center p-4 bg-amber-gray-50">
        <CustomFooter />
      </div>
    </>
  );
}
