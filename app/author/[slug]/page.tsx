import Image from "next/image";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";
import { authors } from "@/data/authors";
import CustomFooter from "@/components/customFooter";

interface PageProps{
    params: Promise<{slug: string}>;
}

export default async function AuthorPage({ params }:PageProps){
    const { slug } = await params;
    const author = authors.find(authors => authors.slug === slug);

    if (!author) {
        return notFound();
    }

    const authorImage = author.profileImageUrl ?? "/images/emptynews.jpg";

    return (
        <>
        <Banner/>
        <div className="flex justify-center items-center">
            <div className="flex flex-row gap-4 bg-amber-50 p-4 rounded-lg shadow-lg">
                <div className="flex p-x4">
                    <Image src={authorImage} alt={author.name} width={100} height={100} className="rounded-md object-cover" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl">{author.name}</h1>
                    <h2>{author.bio}</h2>
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-10 gap-4">
            <h2 className="text-xl font-bold">Written Articles</h2>
            <div className="flex flex-1 bg-amber-50 p-4 rounded-lg shadow-lg">
        <ul role="list">
        {articles.filter(article => article.authorSlug === author.slug).map((article) => (
          <li key={article.id} className="flex py-4 text-blue-500 hover:underline first:pt-0 last:pb-0">
            <Link href={`/articles/${article.slug}`}>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900">{article.title}</p>
              <p className="text-sm text-gray-500">{article.description}</p>
            </div>
            </Link>
          </li>
        ))}
      </ul>
      </div>
        </div>
        <CustomFooter/>
        </>
    );
}