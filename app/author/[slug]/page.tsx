import Image from "next/image";
import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import CustomFooter from "@/components/CustomFooter";
import ArticleList from "@/components/ArticleList";
import { getArticlesByAuthor, getAuthorBySlug } from "@/app/lib/queries";
import { ContentstackRequestError } from "@/app/lib/cs_data";
import ContentstackUnavailable from "@/components/ContentstackUnavailable";
import { formatArticle, formatAuthor } from "@/scripts/objectParser";

interface PageProps{
    params: Promise<{slug: string}>;
}

export default async function AuthorPage({ params }:PageProps){
    const { slug } = await params;
    let authorData: Awaited<ReturnType<typeof getAuthorBySlug>> = null;
    let articleData: Awaited<ReturnType<typeof getArticlesByAuthor>> = null;
    let cmsUnavailable = false;
    try {
        authorData = await getAuthorBySlug(slug);
        if (authorData) {
            articleData = await getArticlesByAuthor(authorData.slug);
        }
    } catch (error) {
        if (!(error instanceof ContentstackRequestError)) throw error;
        console.error(`Unable to load author "${slug}" because Contentstack is unavailable:`, error);
        cmsUnavailable = true;
    }
    if (cmsUnavailable) return <ContentstackUnavailable />;
    
    if (!authorData) {
        return notFound();
    }

    const author = formatAuthor(authorData);

    const articlesFromCms = articleData ?? [];

    //In this case I cannot send a 404 if the author has no articles
    //because they may be a newly hired author
    
    const articles = articlesFromCms.map(formatArticle);

    return (
        <div className="flex min-h-screen flex-col bg-stone-100 text-neutral-950">
            <Banner />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <section
                    aria-labelledby="author-name"
                    className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:gap-7 sm:p-7"
                >
                    <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-neutral-200 sm:size-36">
                        <Image
                            src={author.profileImage ?? "/images/emptynews.jpg"}
                            alt={author.profileImage ? `${author.title}'s profile` : ""}
                            fill
                            sizes="(max-width: 639px) 112px, 144px"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="min-w-0 text-center sm:text-left">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-red-700">
                            TIME contributor
                        </p>
                        <h1
                            id="author-name"
                            className="font-serif text-3xl font-bold tracking-tight sm:text-4xl"
                        >
                            {author.title}
                        </h1>
                        {author.bio && (
                            <p className="mt-3 whitespace-pre-line text-base leading-7 text-neutral-600 sm:text-lg">
                                {author.bio}
                            </p>
                        )}
                    </div>
                </section>

                <ArticleList
                    title="Written Articles"
                    articles={articles}
                    variant="author"
                />
            </main>
            <CustomFooter />
        </div>
    );
}