import Banner from "../components/Banner";
import CustomFooter from "@/components/CustomFooter";
import FeaturedArticles from "@/components/FeaturedArticles";
import ArticleList from "@/components/ArticleList";
import {
  getFeaturedArticles,
  sortArticlesByPublishedAt,
} from "./lib/queries";
import { ContentstackRequestError } from "./lib/cs_data";
import ContentstackUnavailable from "@/components/ContentstackUnavailable";
import { formatArticle } from "@/scripts/objectParser";

export default async function Home() {
  let articleResults: [
    Awaited<ReturnType<typeof getFeaturedArticles>>,
    Awaited<ReturnType<typeof getFeaturedArticles>>,
  ] = [null, null];
  let cmsUnavailable = false;
  try {
    articleResults = await Promise.all([
      getFeaturedArticles(true),
      getFeaturedArticles(false)
    ]);
  } catch (error) {
    if (!(error instanceof ContentstackRequestError)) throw error;
    console.error('Unable to render the home page because Contentstack is unavailable:', error);
    cmsUnavailable = true;
  }
  if (cmsUnavailable) return <ContentstackUnavailable />;

  const [featuredArticles, nonFeaturedArticles] = articleResults;
  const allFeaturedArticles = featuredArticles ?? [];
  const featuredDomainArticles = allFeaturedArticles
    .slice(0, 3)
    .map(formatArticle);
  const otherArticles = sortArticlesByPublishedAt([
    ...(nonFeaturedArticles ?? []),
    ...allFeaturedArticles.slice(3),
  ]);
  const nonFeaturedDomainArticles = otherArticles.map(formatArticle);

  return (
    <>
    <Banner/>
    <div className="flex justify-center items-start">
      <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
    </div>
    <div className="flex justify-center items-start">
      <p className="text-lg mt-2">Today&apos;s Headlines</p>
    </div>
    <FeaturedArticles articles={featuredDomainArticles} />
    <ArticleList title="Other articles" articles={nonFeaturedDomainArticles} />
    <CustomFooter/>
    </>
  );
}
