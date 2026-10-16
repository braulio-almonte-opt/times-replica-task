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
  const featuredDomainArticles = (featuredArticles ?? []).map((article) => {
    const formattedArticle = formatArticle(article);
    return {
      title: formattedArticle.title,
      slug: formattedArticle.slug,
      description: formattedArticle.description,
      imageUrl: formattedArticle.imageUrl,
    };
  });
  const latestArticles = sortArticlesByPublishedAt(nonFeaturedArticles ?? []);
  const latestDomainArticles = latestArticles.map(formatArticle);

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-neutral-950">
      <Banner />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <section aria-labelledby="top-stories-heading">
          <div className="mb-5 flex items-end justify-between border-b border-neutral-300 pb-3">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                TIME News
              </p>
              <h1
                id="top-stories-heading"
                className="font-serif text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Top Stories
              </h1>
            </div>
            <span className="hidden pb-1 text-sm text-neutral-500 sm:block">
              The latest from TIME
            </span>
          </div>
          <FeaturedArticles articles={featuredDomainArticles} />
        </section>
        <ArticleList
          title="Latest Stories"
          articles={latestDomainArticles}
          variant="home"
        />
      </main>
      <CustomFooter />
    </div>
  );
}
