import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import CalculateTimeDifference from "@/scripts/timeDifference";

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
  //I wanted to return all the divs but apparently that is not possible and AI suggested to use a "fragment"
  //or basically the <> </> tags.
  //Side note, I could just wrap everything on a div that takes the whole page, but I'm running out of time...
  return (
    <>
      <Banner />
      <div className="flex justify-center items-start">
        <h1 className="text-4xl font-bold mt-4">
          Welcome to the TIME News Website
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
        <h3 className="text-xl font-semibold mb-2">
          {" "}
          Written by: {article.author}
        </h3>
        <p className="text-lg mb-4">{article.description}</p>
        <div className="w-full h-64 relative mb-4">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-base">{article.content}</p>
        <p className="text-sm text-gray-500 mt-4">
          Published {CalculateTimeDifference(article.publishedAt)} days ago on {article.publishedAt}.
        </p>
      </div>
    </>
  );
}

//Old code/idea that I had, but it is already corrected on earlier lines.
// export default function TestArticle1(){
//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-4">Article 1</h1>
//         </div>
//     )
// }
