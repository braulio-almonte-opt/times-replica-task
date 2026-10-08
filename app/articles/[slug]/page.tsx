import Image from "next/image";
import { articles } from "@/data/articles";
import { authors } from "@/data/authors";
import { notFound } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";
import calculateTimeDifference from "@/scripts/timeDifference";
import CustomFooter from "@/components/CustomFooter";

interface PageProps {
  params: Promise<{ slug: string }>;
}
// Doubt: I don't know how to exactly use promises
// This was suggested by AI but I need to research more on how and why it works.

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return notFound();
  }
  const author = authors.find((author) => author.slug === article.authorSlug);
  if (!author) {
    return notFound();
  }
  //I wanted to return all the divs but apparently that is not possible and AI suggested to use a "fragment"
  //or basically the <> </> tags.
  //Side note, I could just wrap everything on a div that takes the whole page, but I'm running out of time...
  return (
    <>
      <Banner />
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
        <h3 className="text-xl font-semibold mb-2">
          Written by:{" "}
          <Link href={`/author/${author.slug}`} className="text-blue-500 hover:underline">
            {author.name}
          </Link>
        </h3>
        <p className="text-lg mb-4">{article.description}</p>
        <div className="w-full h-64 relative mb-4">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-base">{article.content}</p>
        <p className="text-sm text-gray-500 mt-4">
          Published {calculateTimeDifference(article.publishedAt)} on {article.publishedAt}.
        </p>
      </div>
      <CustomFooter/>
    </>
  );
}
