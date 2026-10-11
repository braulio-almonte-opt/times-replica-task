import Link from "next/link";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";

export default function CustomFooter(){

    return (
        <footer className="mt-4 flex flex-col items-center gap-6 bg-amber-gray-50 p-4 text-sm text-gray-500">
          <div className="flex flex-row gap-50">
            <section aria-labelledby="footer-categories-heading">
              <h2 id="footer-categories-heading" className="text-xl font-bold my-4">Categories</h2>
              <ul role="list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.slug}`} className="hover:underline">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="footer-authors-heading">
              <h2 id="footer-authors-heading" className="text-xl font-bold my-4">Authors</h2>
              <ul role="list">
                {authors.map((author) => (
                  <li key={author.id}>
                    <Link href={`/author/${author.slug}`} className="hover:underline">
                      {author.name}
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