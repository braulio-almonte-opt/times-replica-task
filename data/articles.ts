import type { AuthorSlug } from "@/data/authors";
import type { CategorySlug } from "@/data/categories";

export interface Article {
    id: number;
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    categorySlug: CategorySlug;
    authorSlug: AuthorSlug;
    content: string;
    publishedAt: string;
}

export function filterByCategory(
    articles: readonly Article[],
    category: CategorySlug
): Article[] {
    return articles.filter((article) => article.categorySlug === category);
}

// Extra articles are going to be displayed in the homepage column, therefore they
// don't need extra info as they are static
export const articles = [
    {
        id: 1,
        slug: "article1",
        title: "Hospital Opened Nearby",
        description: "This is the first modern hospital in the area.",
        imageUrl: "/images/hospital.jpg",
        categorySlug: "healthcare",
        authorSlug: "john-doe",
        content: "The new hospital is equipped with state-of-the-art medical technology and staffed by highly trained professionals. It aims to provide top-notch healthcare services to the local community.",
        publishedAt: "2026-06-01"
    },
    {
        id: 2,
        slug: "article2",
        title: "River Dam Built as Flood Control",
        description: "It is expected to hold back floodwaters.",
        imageUrl: "/images/riverdam.jpg",
        categorySlug: "environment",
        authorSlug: "jane-smith",
        content: "The newly constructed river dam is designed to manage water flow and prevent flooding in the surrounding areas. It will help protect homes and businesses from potential flood damage.",
        publishedAt: "2026-06-02"
    },
    {
        id: 3,
        slug: "article3",
        title: "Supermarket Prices expected to be rise soon",
        description: "Do your groceries while you can.",
        imageUrl: "/images/supermarket.jpeg",
        categorySlug: "business",
        authorSlug: "alice-johnson",
        content: "Due to recent supply chain disruptions and increased demand, supermarket prices are expected to rise in the coming months. Consumers are advised to stock up on essential items while prices are still reasonable.",
        publishedAt: "2026-06-03"
    },
    {
        id: 4,
        slug: "article4",
        title: "New Park Opens in Downtown Area",
        description: "A new green space for the community to enjoy.",
        imageUrl: "/images/park.jpeg",
        categorySlug: "environment",
        authorSlug: "grace-lee",
        content: "A new park has opened in the downtown area, providing a green space for the community to enjoy.",
        publishedAt: "2026-06-04"
    },
    {
        id: 5,
        slug: "article5",
        title: "Local Library Hosts Summer Reading Program",
        description: "Encouraging children to read during the summer months.",
        imageUrl: "/images/library.jpg",
        categorySlug: "education",
        authorSlug: "bob-wilson",
        content: "The local library is hosting a summer reading program for children of all ages. The program includes fun activities, book clubs, and rewards for completing reading challenges.",
        publishedAt: "2026-06-04"
    },
    {
        id: 6,
        slug: "article6",
        title: "City Council Approves New Bike Lanes",
        description: "Promoting eco-friendly transportation options.",
        imageUrl: "/images/bikelanes.jpg",
        categorySlug: "transportation",
        authorSlug: "charlie-brown",
        content: "The city council has approved the construction of new bike lanes to encourage residents to use eco-friendly transportation options.",
        publishedAt: "2026-06-05"
    },
    {
        id: 7,
        slug: "article7",
        title: "Community Center Offers Free Fitness Classes",
        description: "Encouraging residents to stay active and healthy.",
        imageUrl: "/images/fitness.jpg",
        categorySlug: "health",
        authorSlug: "david-lee",
        content: "The community center is offering free fitness classes to help residents stay active and healthy.",
        publishedAt: "2026-06-06"
    },
    {
        id: 8,
        slug: "article8",
        title: "Local Farmers Market Expands to New Location",
        description: "Providing fresh produce and goods to the community.",
        imageUrl: "/images/farmersmarket.jpg",
        categorySlug: "food",
        authorSlug: "eve-davis",
        content: "The local farmers market has expanded to a new location, providing fresh produce and goods to the community.",
        publishedAt: "2026-06-07"
    },
    {
        id: 9,
        slug: "article9",
        title: "New School Opens in the Neighborhood",
        description: "Providing quality education to local students.",
        imageUrl: "/images/school.jpg",
        categorySlug: "education",
        authorSlug: "frank-miller",
        content: "A new school has opened in the neighborhood, providing quality education to local students.",
        publishedAt: "2026-06-08"
    },
    {
        id: 10,
        slug: "article10",
        title: "City Hosts Annual Music Festival",
        description: "A celebration of local and international music talent.",
        imageUrl: "/images/musicfestival.jpg",
        categorySlug: "entertainment",
        authorSlug: "grace-lee",
        content: "The city is hosting its annual music festival, showcasing talented local and international artists.",
        publishedAt: "2026-06-09"
    }

] satisfies Article[];
