import { 
  Article, 
  Author, 
  Category,
  ArticleResponse,
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
  });

  return data.all_article.items[0] ?? null;
}

// Get articles by category for category pagination
export async function getArticlesByCategory(category: string, skippedArticles: number, limitArticles: number): Promise<Article[] | null>{
  const query = `query getArticlesByCategory {
  all_article(where: {category: {category: {title: "${category}"}}},skip:${skippedArticles}, limit:${limitArticles}) {
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
  const data = await fetchGraphQL<ArticleResponse>({
    query,
    variables:{category},
  });

  return data.all_article.items ?? null;
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
  });

  return data.all_article.items ?? null;
}

// Get featured articles for home page
export async function getFeaturedArticles(featured: boolean): Promise<Article[] | null>{
  const query = `query getFeaturedArticles {
  all_article(where: {featured: ${featured}}) {
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
    variables:{featured},
  });

  return data.all_article.items ?? null;
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
  const data = await fetchGraphQL<AuthorResponse>({ query });
  return data.all_author.items ?? null;
}

// Get single author for their profile page
export async function getAuthorBySlug(slug: string): Promise<Author | null>{
  const query = `
  query getAuthorBySlug {
  all_author(where: {slug: "${slug}"}) {
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
    variables: {slug}
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

  const data = await fetchGraphQL<CategoryResponse>({ query });

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
    variables: {slug}
  })

  return data.all_category.items[0] ?? null;
}
