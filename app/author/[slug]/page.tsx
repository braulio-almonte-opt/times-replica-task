import Image from "next/image";
import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import CustomFooter from "@/components/CustomFooter";
import ArticleList from "@/components/ArticleList";
import { getArticlesByAuthor, getAuthorBySlug } from "@/app/lib/queries";
import { formatArticle, formatAuthor } from "@/scripts/objectParser";

interface PageProps{
    params: Promise<{slug: string}>;
}

export default async function AuthorPage({ params }:PageProps){
    const { slug } = await params;
    const authorData = (await getAuthorBySlug(slug));
    
    if (!authorData) {
        return notFound();
    }

    const author = formatAuthor(authorData);

    const authorImage = author.profileImage;

    const articleData = (await getArticlesByAuthor(author.title)) ?? [];

    //In this case I cannot send a 404 if the author has no articles
    //because they may be a newly hired author
    const articles = articleData.map(formatArticle);

    return (
        <>
        <Banner/>
        <div className="flex justify-center items-center">
            <div className="flex flex-row gap-4 bg-amber-50 p-4 rounded-lg shadow-lg">
                <div className="flex p-x4">
                    <Image src={authorImage ?? "/images/emptynews.jpg"} alt={author.title} width={100} height={100} className="rounded-md object-cover" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl">{author.title}</h1>
                    <h2>{author.bio}</h2>
                </div>
            </div>
        </div>
        <ArticleList
            title="Written Articles"
            articles={articles}
        />
        <CustomFooter/>
        </>
    );
}