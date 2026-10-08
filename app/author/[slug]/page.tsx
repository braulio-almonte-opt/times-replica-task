import Image from "next/image";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import { authors } from "@/data/authors";
import CustomFooter from "@/components/customFooter";
import ArticleList from "@/components/ArticleList";

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
        <ArticleList
            title="Written Articles"
            articles={articles.filter(article => article.authorSlug === author.slug)}
        />
        <CustomFooter/>
        </>
    );
}