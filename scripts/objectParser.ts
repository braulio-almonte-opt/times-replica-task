import type {
  Article as CMSArticle,
  Author as CMSAuthor,
  Category as CMSCategory,
} from "@/app/types/cmsTypes";
import type {
  Article,
  Author,
  Category,
} from "@/app/types/domainTypes";

export function formatArticle(article: CMSArticle): Article {
  return {
    title: article.title,
    slug: article.slug,
    description: article.description,
    content: article.content,
    publishedAt: article.publishedat,
    featured: article.featured,
    imageUrl: article.imageConnection?.edges[0]?.node.url ?? null,
    author: article.authorConnection?.edges[0]?.node
      ? formatAuthor(article.authorConnection.edges[0].node)
      : null,
    category: article.categoryConnection?.edges[0]?.node
      ? formatCategory(article.categoryConnection.edges[0].node)
      : null,
  };
}

export function formatAuthor(author: CMSAuthor): Author {
  return {
    title: author.title,
    slug: author.slug,
    bio: author.bio,
    profileImage: author.profileimageConnection?.edges[0]?.node.url ?? null,
  };
}

export function formatCategory(category: CMSCategory): Category {
  return {
    title: category.title,
    slug: category.slug,
  };
}