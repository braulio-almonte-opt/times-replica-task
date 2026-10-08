import { articles, filterByCategory } from "@/data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";
import FeaturedArticles from "@/components/FeaturedArticles";
import { categories } from "@/data/categories";
import CustomFooter from "@/components/CustomFooter";
import { paginate } from "@/data/pagination";

//This and the home page could have been transformed into components, but again, I'm running out of time...

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}

const PAGE_SIZE = 1;

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const [{ slug }, { page: requestedPage }] = await Promise.all([params, searchParams]);
  const category = categories.find((category) => category.slug === slug);
  if (!category) {
    return notFound();
  }

  const categoryArticles = filterByCategory(articles, category.slug);
  const pageValue = Array.isArray(requestedPage) ? undefined : requestedPage;
  const parsedPage = pageValue && /^\d+$/.test(pageValue) ? Number(pageValue) : 1;
  const totalPages = Math.ceil(categoryArticles.length / PAGE_SIZE);
  if (!Number.isSafeInteger(parsedPage) || parsedPage < 1 || parsedPage > totalPages) {
    return notFound();
  }
  const pageArticles = paginate(categoryArticles, parsedPage, PAGE_SIZE);

  return (
    <>
      <Banner />
      <div className="flex justify-center items-start">
        <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
      </div>
      <div className="flex justify-center items-start">
        <p className="text-lg mt-2">Today&apos;s Headlines</p>
      </div>
      <FeaturedArticles articles={pageArticles} />
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