import { 
  Article, 
  Author, 
  Category,
  AllArticlesResponse,
  SingleArticleResponse, 
  AllAuthorResponse,
  SingleAuthorResponse,
  AllCategoryResponse,
  SingleCategoryResponse} from "../types/cmsTypes";
import { fetchGraphQL } from "./cs_data";

// Fetch all articles typed
export async function getAllArticles(): Promise<Article[]> {
  const query = `
    query GetAllArticles {
      all_article {
        items {
          title
          slug
          description
          publishedat
          featured
          imageConnection {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<AllArticlesResponse>({ query });
  return data.all_article.items;
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
          imageConnection {
            edges {
              node {
                url
              }
            }
          }
          authorConnection {
            edges {
              node {
                ... on Author {
                  title
                  bio
                  slug
                }
              }
            }
          }
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

  const data = await fetchGraphQL<SingleArticleResponse>({
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
      imageConnection {
        edges {
          node {
            url
          }
        }
      }
    }
  }
}`
  const data = await fetchGraphQL<AllArticlesResponse>({
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
  const data = await fetchGraphQL<AllArticlesResponse>({
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
      imageConnection {
        edges {
          node {
            url
          }
        }
      }
    }
  }
}

 `

  const data = await fetchGraphQL<AllArticlesResponse>({
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
      profileimageConnection {
        edges {
          node {
            url
          }
        }
      }
    }
  }
}
  `
  const data = await fetchGraphQL<AllAuthorResponse>({ query });
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
      profileimageConnection {
        edges {
          node {
            url
          }
        }
      }
    }
  }
}

  `
  const data = await fetchGraphQL<SingleAuthorResponse>({
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

  const data = await fetchGraphQL<AllCategoryResponse>({ query });

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
  const data = await fetchGraphQL<SingleCategoryResponse>({
    query,
    variables: {slug}
  })

  return data.all_category.items[0] ?? null;
}

export async function getPaginatedArticlesByCategory(slug:string, limitArticles: number, skipArticles: number): Promise<Category[] | null>{
  const query =`
  `
  return null;
}