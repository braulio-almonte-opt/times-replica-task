import Image from "next/image";
import ArticleCard from "../components/articleCard";
import Link from "next/link";
import {articles} from "@/data/articles";

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
    <div className="flex flex-row justify-center items-start h-64">
      {/* Row with the three articles, also, I know AI likes to write comments but this one is mine
      to keep code organized */}
      {/* Changed approach to generate card dinamically, code is cleaner now :D*/}
      {articles.map((article) =>(
        <div className="flex flex-col justify-center items-center w-1/3 h-150 p-4 m-5 bg-amber-50 rounded-lg shadow-md">
        <ArticleCard title={article.title} description={article.description} imageUrl={article.imageUrl} />
        <Link href={`/articles/${article.slug}`} className="text-blue-500 mt-2">
          Read more
        </Link>
      </div>
      ))}
    </div>
    </>
  );
}
