import { 
  Article, 
  Author, 
  Category,
  ArticleResponse,
  PaginatedArticleResponse,
  AuthorResponse,
  CategoryResponse} from "../types/cmsTypes";
import { fetchGraphQL } from "./cs_data";

const imageRequestString = `imageConnection {
            edges {
              node {
                url
              }
            }
          }`

const authorRequestString = `authorConnection {
            edges {
              node {
                ... on Author {
                  title
                  bio
                  slug
                }
              }
            }
          }`

const authorProfileImageRequestString = `profileimageConnection {
        edges {
          node {
            url
          }
        }
      }`

function sortArticlesByPublishedAt(articles: Article[]): Article[] {
  return [...articles].sort((firstArticle, secondArticle) => {
    const firstTimestamp = Date.parse(firstArticle.publishedat);
    const secondTimestamp = Date.parse(secondArticle.publishedat);

    if (!Number.isFinite(firstTimestamp)) {
      return Number.isFinite(secondTimestamp) ? 1 : 0;
    }
    if (!Number.isFinite(secondTimestamp)) {
      return -1;
    }

    return secondTimestamp - firstTimestamp;
  });
}

// Fetch single article typed
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const query = `
    query GetArticleBySlug($slug: String!) {
      all_article(where: { slug: $slug }) {
        items {
          title
          slug
          description
          content
          publishedat
          featured
          ${imageRequestString}
          ${authorRequestString}
          categoryConnection {
            edges {
              node {
                ... on Category {
                  title
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<ArticleResponse>({
    query,
    variables: { slug },
    revalidate: 300,
    tags: ['contentstack:articles'],
  });

  return data.all_article.items[0] ?? null;
}

// Get articles by category for category pagination
export async function getArticlesByCategory(category: string, skippedArticles: number, limitArticles: number): Promise<{ articles: Article[]; total: number } | null>{
  const query = `query getArticlesByCategory($category: String!, $skippedArticles: Int!, $limitArticles: Int!) {
  all_article(where: {category: {category: {slug: $category}}}, skip:$skippedArticles, limit:$limitArticles) {
    total
    items {
      title
      slug
      publishedat
      description
      content
      featured
      ${imageRequestString}
    }
  }
}`
  const data = await fetchGraphQL<PaginatedArticleResponse>({
    query,
    variables:{category, skippedArticles, limitArticles},
    revalidate: 300,
    tags: ['contentstack:articles'],
  });

  return {
    articles: data.all_article.items,
    total: data.all_article.total,
  };
}

// Get articles by author (for author page)
export async function getArticlesByAuthor(author:string): Promise<Article[] | null>{
  const query = `
  query getArticlesByAuthor {
  all_article(where: {author: {author: {title: "${author}"}}}) {
    items {
      title
      slug
      publishedat
      description
      content
      featured
    }
  }
}
  `
  const data = await fetchGraphQL<ArticleResponse>({
    query,
    variables:{author},
    revalidate: 300,
    tags: ['contentstack:articles'],
  });

  return data.all_article.items ?? null;
}

// Get featured articles for home page
export async function getFeaturedArticles(featured: boolean): Promise<Article[] | null>{
  const limit = featured ? 3:0; //This is my favorite line. Easy solution to not split featured and non-featured into separate functions :D
  const query = `query getFeaturedArticles ($featured: Boolean!, $limit: Int!) {
  all_article(where: {featured: $featured}, limit: $limit) {
    items {
      content
      description
      featured
      publishedat
      slug
      title
      ${imageRequestString}
    }
  }
}

 `

  const data = await fetchGraphQL<ArticleResponse>({
    query,
    variables:{featured, limit},
    revalidate: 300,
    tags: ['contentstack:articles'],
  });

  return data.all_article.items
    ? sortArticlesByPublishedAt(data.all_article.items)
    : null;
}

// Get all authors for footer
export async function getAllAuthors(): Promise<Author[] | null>{
  const query = `
  query getAllAuthors {
  all_author {
    items {
      bio
      slug
      title
      ${authorProfileImageRequestString}
    }
  }
}
  `
  const data = await fetchGraphQL<AuthorResponse>({
    query,
    revalidate: 3600,
    tags: ['contentstack:authors'],
  });
  return data.all_author.items ?? null;
}

// Get single author for their profile page
export async function getAuthorBySlug(slug: string): Promise<Author | null>{
  const query = `
  query getAuthorBySlug ($slug: String!) {
  all_author(where: {slug: $slug}) {
    items {
      bio
      slug
      title
      ${authorProfileImageRequestString}
    }
  }
}

  `
  const data = await fetchGraphQL<AuthorResponse>({
    query,
    variables: {slug},
    revalidate: 3600,
    tags: ['contentstack:authors'],
  });
  return data.all_author.items[0] ?? null;
}

// Get all categories for footer
export async function getAllCategories():Promise<Category[] | null>{
  const query = `
  query getAllCategories {
  all_category {
    items {
      slug
      title
    }
  }
}
  `

  const data = await fetchGraphQL<CategoryResponse>({
    query,
    revalidate: 3600,
    tags: ['contentstack:categories'],
  });

  return data.all_category.items ?? null;
}

// Get single category for category page render
export async function getCategoryBySlug(slug: string): Promise<Category | null>{
  const query = `
  query getCategoryBySlug($slug: String!) {
  all_category(where: {slug: $slug}) {
    items {
      slug
      title
    }
  }
}
`
  const data = await fetchGraphQL<CategoryResponse>({
    query,
    variables: {slug},
    revalidate: 3600,
    tags: ['contentstack:categories'],
  })

  return data.all_category.items[0] ?? null;
}
