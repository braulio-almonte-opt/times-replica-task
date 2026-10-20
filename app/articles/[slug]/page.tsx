import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";
import calculateTimeDifference, { formatDate } from "@/scripts/timeDifference";
import CustomFooter from "@/components/CustomFooter";
import { getArticleBySlug } from "@/app/lib/queries";
import { ContentstackRequestError } from "@/app/lib/cs_data";
import ContentstackUnavailable from "@/components/ContentstackUnavailable";
import {formatArticle} from "@/scripts/objectParser";
import ArticleDataLayer from "@/components/ArticleDataLayer";

interface PageProps {
  params: Promise<{ slug: string }>;
}
// Doubt: I don't know how to exactly use promises
// This was suggested by AI but I need to research more on how and why it works.

export default async function ArticlePage({ params }: PageProps) {

  const { slug } = await params;

  //PHASE 2: After 4 files and a lot of effort I managed to get the backend going
  //Now I can just parse the response's objects and address their properties
  //directly without having to write really long lines

  //Now that I understand the concepts I can just replicate everything with the other
  //components/pages

  let articleData: Awaited<ReturnType<typeof getArticleBySlug>> = null;
  let cmsUnavailable = false;
  try {
    articleData = await getArticleBySlug(slug);
  } catch (error) {
    if (!(error instanceof ContentstackRequestError)) throw error;
    console.error(`Unable to load article "${slug}" because Contentstack is unavailable:`, error);
    cmsUnavailable = true;
  }
  if (cmsUnavailable) return <ContentstackUnavailable />;

  if (!articleData) {
    return notFound();
  }
  const article = formatArticle(articleData)
  const author = article.author;

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 text-neutral-950">
      <ArticleDataLayer
        title={article.title}
        slug={article.slug}
        category={article.category?.title}
        author={author?.title}
        imageUrl={article.imageUrl}
        publishedDate={article.publishedAt}
      />
      <Banner showSignup={true}/>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <article className="mx-auto max-w-5xl">
          <header className="mb-7 border-b border-neutral-300 pb-5">
            {article.category && (
              <Link
                href={`/category/${article.category.slug}`}
                className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-red-700 hover:text-red-800 hover:underline"
              >
                {article.category.title}
              </Link>
            )}
            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-600">
              <span>
                Written by{" "}
                {author ? (
                  <Link
                    href={`/author/${author.slug}`}
                    className="font-semibold text-neutral-950 hover:text-red-700 hover:underline"
                  >
                    {author.title}
                  </Link>
                ) : (
                  <span className="font-semibold text-neutral-950">Anonymous</span>
                )}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt}>
                Published {calculateTimeDifference(article.publishedAt)} on{" "}
                {formatDate(article.publishedAt)}
              </time>
            </div>
          </header>

          <div className="flow-root">
            <figure className="relative mb-5 aspect-16/10 w-full overflow-hidden rounded-xl bg-neutral-200 md:float-left md:mb-4 md:mr-6 md:w-[38%]">
              <Image
                src={article.imageUrl ?? "/images/emptynews.jpg"}
                alt={article.title}
                fill
                sizes="(max-width: 767px) 100vw, 38vw"
                priority
                className="object-cover"
              />
            </figure>
            <p className="mb-5 text-lg font-medium leading-8 text-neutral-700 sm:text-xl sm:leading-9">
              {article.description}
            </p>
            <div className="whitespace-pre-line font-serif text-base leading-8 text-neutral-900 sm:text-lg sm:leading-9">
              {article.content}
            </div>
          </div>
        </article>
      </main>
      <CustomFooter />
    </div>
  );
}
