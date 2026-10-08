import Banner from "../components/Banner";
import { articles } from "@/data/articles";
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
    <CustomFooter/>
    </>
  );
}
