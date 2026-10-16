import Link from "next/link";
import { getAllCategories, getAllAuthors } from "@/app/lib/queries";
import { ContentstackRequestError } from "@/app/lib/cs_data";

export default async function CustomFooter(){

    let categories: Awaited<ReturnType<typeof getAllCategories>> = null;
    let authors: Awaited<ReturnType<typeof getAllAuthors>> = null;
    let cmsUnavailable = false;
    try {
      [categories, authors] = await Promise.all([
        getAllCategories(),
        getAllAuthors(),
      ]);
    } catch (error) {
      if (!(error instanceof ContentstackRequestError)) throw error;
      console.error("Unable to load footer links because Contentstack is unavailable:", error);
      cmsUnavailable = true;
    }
    if (cmsUnavailable) {
      return (
        <footer className="mt-12 border-t border-neutral-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
          Footer links are temporarily unavailable.
        </footer>
      );
    }

    return (
        <footer className="mt-12 border-t border-neutral-200 bg-white px-4 py-8 text-sm text-neutral-600 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:gap-20">
            <section aria-labelledby="footer-categories-heading" className="flex-1">
              <h2 id="footer-categories-heading" className="mb-3 font-serif text-lg font-bold text-neutral-950">Categories</h2>
              <ul role="list" className="space-y-2">
                {(categories ?? []).map((category) => (
                  <li key={category.slug}>
                    <Link href={`/category/${category.slug}`} className="transition-colors hover:text-red-700 hover:underline">
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="footer-authors-heading" className="flex-1">
              <h2 id="footer-authors-heading" className="mb-3 font-serif text-lg font-bold text-neutral-950">Authors</h2>
              <ul role="list" className="space-y-2">
                {(authors ?? []).map((author) => (
                  <li key={author.slug}>
                    <Link href={`/author/${author.slug}`} className="transition-colors hover:text-red-700 hover:underline">
                      {author.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <p className="mx-auto mt-8 max-w-7xl border-t border-neutral-200 pt-5 text-center">
            &copy; {new Date().getFullYear()} TIME News. All rights reserved.
          </p>
        </footer>
    );
}