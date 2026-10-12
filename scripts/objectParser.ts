import { Article, Author, Category } from "@/app/types/cmsTypes";

export function formatArticle(article: Article) {
  return {
    title: article.title,
    slug: article.slug,
    description: article.description,
    content: article.content,
    publishedAt: article.publishedat,
    isFeatured: article.featured,
    imageUrl: article.imageConnection?.edges[0]?.node.url ?? null,
    author: article.authorConnection?.edges[0]?.node ?? null,
    category: article.categoryConnection?.edges[0]?.node ?? null,
  };
}

export function formatAuthor(author:Author){
    return{
        title: author.title,
        slug: author.slug,
        bio: author.bio,
        profileImage: author.profileimageConnection?.edges[0]?.node.url ?? null
    };
}

export function formatCategory(category:Category){
    return{
        title: category.title,
        slug:category.slug,
    };
}