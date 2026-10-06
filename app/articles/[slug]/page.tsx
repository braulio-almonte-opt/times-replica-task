import {articles} from "@/data/articles";
import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
interface PageProps{
    params: Promise<{slug: string}>;
}

export default async function ArticlePage({params}: PageProps){
    const {slug} = await params;
    const article = articles.find(article => article.slug === slug);

    if(!article){
        return notFound();
    }

    return (
        <>
        <div className="flex justify-center items-start">
            <Link href="/" className="text-blue-500 hover:underline">
            <Image src="/images/TIME-logo.png" alt="TIME Logo" width={100} height={100} />
            </Link>
          </div>
          <div className="flex justify-center items-start">
            <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
          </div>
        <div className="flex flex-col justify-center items-center p-4">
            <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
            <p className="text-lg mb-4">{article.description}</p>
            <div className="w-full h-64 relative mb-4">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-base">{article.content}</p>
            <p className="text-sm text-gray-500 mt-4">Published on: {article.publishedAt}</p>
        </div>
        </>
    );
}

// export default function TestArticle1(){
//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-4">Article 1</h1>
//         </div>
//     )
// }