import Link from "next/link";
import Banner from "../components/Banner";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { authors } from "@/data/authors";
import CustomFooter from "@/components/customFooter";
import FeaturedArticles from "@/components/FeaturedArticles";
import ArticleList from "@/components/ArticleList";

export default function Home() {
  const newestArticles = [...articles].sort((first, second) =>
    second.publishedAt.localeCompare(first.publishedAt)
  );

  return (
    <>
    <Banner/>
    <div className="flex justify-center items-start">
      <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
    </div>
    <div className="flex justify-center items-start">
      <p className="text-lg mt-2">Today&apos;s Headlines</p>
    </div>
    <FeaturedArticles articles={newestArticles.slice(0, 3)} />
    <ArticleList title="Other articles" articles={newestArticles.slice(3)} />
    <div className="flex flex-col justify-center items-center p-4 bg-amber-gray-50">
      {/* Tried to adjust footer to the left but couldn't do it */}
      <div className="flex flex-row gap-50">
        <ul role="list">
          <li>
            <h2 className="text-xl font-bold my-4">Categories</h2>
          </li>
            {categories.map((category) =>(
              <Link key={category.id} href={`/category/${category.slug}`}>
                <p key={category.id}>{`${category.name}`}</p>
              </Link>
            ))}
        </ul>
        <ul role="list">
          <li>
            <h2 className="text-xl font-bold my-4">Authors</h2>
          </li>
            {authors.map((author) =>(
              <Link key={author.id} href={`/author/${author.slug}`}>
                <p key={author.id}>{`${author.name}`}</p>
              </Link>
            ))}
        </ul>
      </div>
      <CustomFooter/>
      {/* <footer className="mt-4 text-sm text-left text-gray-500">
        &copy; {new Date().getFullYear()} TIME News. All rights reserved.
      </footer> */}
    </div>
    </>
  );
}
