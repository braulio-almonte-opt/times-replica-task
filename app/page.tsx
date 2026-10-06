import Image from "next/image";
import ArticleCard from "../components/articleCard";
import Link from "next/link";
import {articles, extraArticles} from "@/data/articles";

// TODO1: Display banner with TIME image and welcome message (DONE)
// TODO2: Show cards with featured articles (DONE)
// TODO3: Make articles show dynamically instead of manually [articles.map()](DONE)
// TODO4: Show column with additional articles (WIP)
// TODO5: Make a footer with categories, common info and authors (Not started)
// TODO6: Newsletter Signup process (Not started)
// TODO7: Handle 404 pages with a custom message and link to homepage (Not started)
// TODO: 

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-start">
      <Image src="/images/TIME-logo.png" alt="TIME Logo" width={100} height={100} />
    </div>
    <div className="flex justify-center items-start">
      <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
    </div>
    <div className="flex justify-center items-start">
      <p className="text-lg mt-2">Today's Headlines</p>
    </div>
    <div className="flex flex-row justify-center items-start h-auto">
      {/* Row with the three articles, also, I know AI likes to write comments but this one is mine
      to keep code organized */}
      {/* Changed approach to generate card dinamically, code is cleaner now :D*/}
      {articles.map((article) =>(
        <div key={article.id} className="flex flex-col justify-center items-center w-1/3 h-150 p-4 m-5 bg-amber-50 rounded-lg shadow-md">
        <ArticleCard title={article.title} description={article.description} imageUrl={article.imageUrl} />
        <Link href={`/articles/${article.slug}`} className="text-blue-500 mt-2">
          Read more
        </Link>
      </div>
      ))}
    </div>
    {/* Column to display additional articles that are not featured */}
    <div className="flex flex-col justify-center items-center p-4 bg-amber-gray-50">
      <table className="border-separate border border-gray-300">
        <thead>
          <tr>  
            <th>Article Title</th>
            <th>Article Description</th>
          </tr>
        </thead>
        <tbody>
          {extraArticles.map((article) => (
            <tr>
              <td className="border border-gray-300 p-2">{article.title}</td>
              <td className="border border-gray-300 p-2">{article.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
