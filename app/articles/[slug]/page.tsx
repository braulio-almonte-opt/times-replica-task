import {articles} from "@/data/articles";
import {notFound} from "next/navigation";
import Image from "next/image";
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
              <Image src="/images/TIME-logo.png" alt="TIME Logo" width={100} height={100} />
            </div>
            <div className="flex justify-center items-start">
              <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
            </div>
        <div className="flex flex-col justify-center items-center p-4">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-lg mb-4">{article.description}</p>
            <div className="w-full h-64 relative mb-4">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-base">{article.content}</p>
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