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
        <footer className="mt-12 border-t border-border bg-surface px-4 py-8 text-center text-sm text-foreground-muted">
          Footer links are temporarily unavailable.
        </footer>
      );
    }

    return (
        <footer className="mt-12 border-t border-border bg-surface px-4 py-8 text-sm text-foreground-muted sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:gap-20">
            <section aria-labelledby="footer-categories-heading" className="flex-1">
              <h2 id="footer-categories-heading" className="mb-3 font-serif text-lg font-bold text-foreground">Categories</h2>
              <ul role="list" className="space-y-2">
                {(categories ?? []).map((category) => (
                  <li key={category.slug}>
                    <Link href={`/category/${category.slug}`} className="transition-colors hover:text-accent hover:underline">
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="footer-authors-heading" className="flex-1">
              <h2 id="footer-authors-heading" className="mb-3 font-serif text-lg font-bold text-foreground">Authors</h2>
              <ul role="list" className="space-y-2">
                {(authors ?? []).map((author) => (
                  <li key={author.slug}>
                    <Link href={`/author/${author.slug}`} className="transition-colors hover:text-accent hover:underline">
                      {author.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <p className="mx-auto mt-8 max-w-7xl border-t border-border pt-5 text-center">
            &copy; {new Date().getFullYear()} TIME News. All rights reserved.
          </p>
        </footer>
    );
}