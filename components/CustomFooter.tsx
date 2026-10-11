import Link from "next/link";
import { getAllCategories, getAllAuthors } from "@/app/lib/queries";

export default async function CustomFooter(){

    const categories = (await getAllCategories()) ?? [];
    const authors = (await getAllAuthors()) ?? [];

    return (
        <footer className="mt-4 flex flex-col items-center gap-6 bg-amber-gray-50 p-4 text-sm text-gray-500">
          <div className="flex flex-row gap-50">
            <section aria-labelledby="footer-categories-heading">
              <h2 id="footer-categories-heading" className="text-xl font-bold my-4">Categories</h2>
              <ul role="list">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/category/${category.slug}`} className="hover:underline">
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="footer-authors-heading">
              <h2 id="footer-authors-heading" className="text-xl font-bold my-4">Authors</h2>
              <ul role="list">
                {authors.map((author) => (
                  <li key={author.slug}>
                    <Link href={`/author/${author.slug}`} className="hover:underline">
                      {author.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <p className="text-center">
            &copy; {new Date().getFullYear()} TIME News. All rights reserved.
          </p>
        </footer>
    );
}