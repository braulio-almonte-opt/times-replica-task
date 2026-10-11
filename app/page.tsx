import Banner from "../components/Banner";
import CustomFooter from "@/components/CustomFooter";
import FeaturedArticles from "@/components/FeaturedArticles";
import ArticleList from "@/components/ArticleList";
import { getFeaturedArticles } from "./lib/queries";

export default async function Home() {

  const featuredArticles  = (await getFeaturedArticles(true)) ?? [];
  const nonFeaturedArticles  = (await getFeaturedArticles(false)) ?? [];

  return (
    <>
    <Banner/>
    <div className="flex justify-center items-start">
      <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
    </div>
    <div className="flex justify-center items-start">
      <p className="text-lg mt-2">Today&apos;s Headlines</p>
    </div>
    <FeaturedArticles articles={featuredArticles} />
    <ArticleList title="Other articles" articles={nonFeaturedArticles} />
    <CustomFooter/>
    </>
  );
}
