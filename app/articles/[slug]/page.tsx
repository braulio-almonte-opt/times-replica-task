import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";
import calculateTimeDifference, { formatDate } from "@/scripts/timeDifference";
import CustomFooter from "@/components/CustomFooter";
import { getArticleBySlug } from "@/app/lib/queries";
import {formatArticle, formatAuthor} from "@/scripts/objectParser";
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

  const articleData = await (getArticleBySlug(slug));

  if (!articleData) {
    return notFound();
  }
  const article = formatArticle(articleData)

  // const author = authors.find((author) => author.slug === article.authorSlug);
  if (!article.author) {
    return notFound();
  }

  const author = formatAuthor(article.author);

  //I wanted to return all the divs but apparently that is not possible and AI suggested to use a "fragment"
  //or basically the <> </> tags.
  //Side note, I could just wrap everything on a div that takes the whole page, but I'm running out of time...
  return (
    <>
    <ArticleDataLayer 
      title={article.title}
      slug={article.slug}
      category={article.category?.title ?? "Uncategorized"}
      author={article.author.title}
      publishedDate={article.publishedAt}>
      </ArticleDataLayer>
      <Banner />
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
        <h3 className="text-xl font-semibold mb-2">
          Written by:{" "}
          <Link href={`/author/${author.slug}`} className="text-blue-500 hover:underline">
            {author.title}
          </Link>
        </h3>
        <p className="text-lg mb-4">{article.description}</p>
        <div className="w-full h-64 relative mb-4">
          <Image
            src={article.imageUrl ?? "/images/emptynews.jpg"}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <p className="text-base">{article.content}</p>
        <p className="text-sm text-gray-500 mt-4">
          Published {calculateTimeDifference(article.publishedAt)} on {formatDate(article.publishedAt)}.
        </p>
      </div>
      <CustomFooter/>
    </>
  );
}
