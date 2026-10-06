export interface Arcticle {
    id: number;
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    category?: string;
    author?: string;
    content?: string;
    publishedAt?: string;
}

export interface category{
    id: number;
    name: string;
}

export interface author{
    id: number;
    name: string;
    bio?: string;
    profileImageUrl?: string;
}

// Extra articles are going to be displayed in the homepage column, therefore they
// don't need extra info as they are static
export const articles: Arcticle[] = [
    {
        id: 1,
        slug: "article1",
        title: "Hospital Opened Nearby",
        description: "This is the first modern hospital in the area.",
        imageUrl: "/images/hospital.jpg",
        category: "Healthcare",
        author: "John Doe",
        content: "The new hospital is equipped with state-of-the-art medical technology and staffed by highly trained professionals. It aims to provide top-notch healthcare services to the local community.",
        publishedAt: "2024-06-01"
    },
    {
        id: 2,
        slug: "article2",
        title: "River Dam Built as Flood Control",
        description: "It is expected to hold back floodwaters.",
        imageUrl: "/images/riverdam.jpg",
        category: "Environment",
        author: "Jane Smith",
        content: "The newly constructed river dam is designed to manage water flow and prevent flooding in the surrounding areas. It will help protect homes and businesses from potential flood damage.",
        publishedAt: "2024-06-02"
    },
    {
        id: 3,
        slug: "article3",
        title: "Supermarket Prices expected to be rise soon",
        description: "Do your groceries while you can.",
        imageUrl: "/images/supermarket.jpeg",
        category: "Business",
        author: "Alice Johnson",
        content: "Due to recent supply chain disruptions and increased demand, supermarket prices are expected to rise in the coming months. Consumers are advised to stock up on essential items while prices are still reasonable.",
        publishedAt: "2024-06-03"
    },

]

export const extraArticles: Arcticle[] = [
    {
        id: 4,
        slug: "article4",
        title: "New Park Opens in Downtown Area",
        description: "A new green space for the community to enjoy.",
        imageUrl: "/images/park.jpg"
    },
    {
        id: 5,
        slug: "article5",
        title: "Local Library Hosts Summer Reading Program",
        description: "Encouraging children to read during the summer months.",
        imageUrl: "/images/library.jpg"
    },
    {
        id: 6,
        slug: "article6",
        title: "City Council Approves New Bike Lanes",
        description: "Promoting eco-friendly transportation options.",
        imageUrl: "/images/bikelanes.jpg"
    },
    {
        id: 7,
        slug: "article7",
        title: "Community Center Offers Free Fitness Classes",
        description: "Encouraging residents to stay active and healthy.",
        imageUrl: "/images/fitness.jpg"
    },
    {
        id: 8,
        slug: "article8",
        title: "Local Farmers Market Expands to New Location",
        description: "Providing fresh produce and goods to the community.",
        imageUrl: "/images/farmersmarket.jpg"
    }
]

export const categories: category[] = [
    {
        id: 1,
        name: "Healthcare"
    },
    {
        id: 2,
        name: "Environment"
    },
    {
        id: 3,
        name: "Business"
    }
]

export const authors: author[] = [
    {
        id: 1,
        name: "John Doe",
        bio: "John is a seasoned journalist with over 10 years of experience in healthcare reporting.",
        profileImageUrl: "/images/johndoe.jpg"
    },
    {
        id: 2,
        name: "Jane Smith",
        bio: "Jane specializes in environmental issues and has been recognized for her investigative reporting.",
        profileImageUrl: "/images/janesmith.jpg"
    },
    {
        id: 3,
        name: "Alice Johnson",
        bio: "Alice covers business news and has a keen eye for market trends and economic developments.",
        profileImageUrl: "/images/alicejohnson.jpg"
    }
]