import ArticleCard from "../components/articleCard";
import Link from "next/link";
import Banner from "../components/Banner";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { authors } from "@/data/authors";
import CustomFooter from "@/components/customFooter";

export default function Home() {
  return (
    <>
    <Banner/>
    <div className="flex justify-center items-start">
      <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
    </div>
    <div className="flex justify-center items-start">
      <p className="text-lg mt-2">Today&apos;s Headlines</p>
    </div>
    <div className="flex flex-row justify-center items-start h-auto">
      {/* Row with the three articles, also, I know AI likes to write comments but this one is mine
      to keep code organized */}
      {/* Changed approach to generate card dinamically, code is cleaner now :D */}
      {articles.slice(0, 3).map((article) =>(
        <div key={article.id} className="flex flex-col justify-center items-center w-1/3 h-150 p-4 m-5 bg-amber-50 rounded-lg shadow-md">
        <ArticleCard title={article.title} description={article.description} imageUrl={article.imageUrl} />
        <Link href={`/articles/${article.slug}`} className="text-blue-500 mt-2">
          Read more
        </Link>
      </div>
      ))}
    </div>
    {/* Column to display additional articles that are not featured */}
    {/* Also generated dinamically based on data provided */}
    <div className="flex flex-col justify-center items-center p-4 bg-amber-gray-50">
      <h2 className="text-xl font-bold mb-4">Other articles</h2>
      <div className="flex flex-1 bg-amber-50 p-4 rounded-lg shadow-lg">
        <ul role="list">
        {articles.slice(3).map((article) => (
          <li key={article.id} className="flex py-4 text-blue-500 hover:underline first:pt-0 last:pb-0">
            <Link href={`/articles/${article.slug}`}>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900">{article.title}</p>
              <p className="text-sm text-gray-500">{article.description}</p>
            </div>
            </Link>
          </li>
        ))}
      </ul>
      </div>
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
