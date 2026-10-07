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
    slug: string;
    name: string;
}

export interface author{
    id: number;
    slug: string;
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
        publishedAt: "2026-06-01"
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
        publishedAt: "2026-06-02"
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
        publishedAt: "2026-06-03"
    },
    {
        id: 4,
        slug: "article4",
        title: "New Park Opens in Downtown Area",
        description: "A new green space for the community to enjoy.",
        imageUrl: "/images/park.jpeg",
        category: "Environment",
        author: "Grace Lee",
        content: "A new park has opened in the downtown area, providing a green space for the community to enjoy.",
        publishedAt: "2026-06-04"
    },
    {
        id: 5,
        slug: "article5",
        title: "Local Library Hosts Summer Reading Program",
        description: "Encouraging children to read during the summer months.",
        imageUrl: "/images/library.jpg",
        category: "Education",
        author: "Bob Wilson",
        content: "The local library is hosting a summer reading program for children of all ages. The program includes fun activities, book clubs, and rewards for completing reading challenges.",
        publishedAt: "2026-06-04"
    },
    {
        id: 6,
        slug: "article6",
        title: "City Council Approves New Bike Lanes",
        description: "Promoting eco-friendly transportation options.",
        imageUrl: "/images/bikelanes.jpg",
        category: "Transportation",
        author: "Charlie Brown",
        content: "The city council has approved the construction of new bike lanes to encourage residents to use eco-friendly transportation options.",
        publishedAt: "2026-06-05"
    },
    {
        id: 7,
        slug: "article7",
        title: "Community Center Offers Free Fitness Classes",
        description: "Encouraging residents to stay active and healthy.",
        imageUrl: "/images/fitness.jpg",
        category: "Health",
        author: "David Lee",
        content: "The community center is offering free fitness classes to help residents stay active and healthy.",
        publishedAt: "2026-06-06"
    },
    {
        id: 8,
        slug: "article8",
        title: "Local Farmers Market Expands to New Location",
        description: "Providing fresh produce and goods to the community.",
        imageUrl: "/images/farmersmarket.jpg",
        category: "Food",
        author: "Eve Davis",
        content: "The local farmers market has expanded to a new location, providing fresh produce and goods to the community.",
        publishedAt: "2026-06-07"
    },
    {
        id: 9,
        slug: "article9",
        title: "New School Opens in the Neighborhood",
        description: "Providing quality education to local students.",
        imageUrl: "/images/school.jpg",
        category: "Education",
        author: "Frank Miller",
        content: "A new school has opened in the neighborhood, providing quality education to local students.",
        publishedAt: "2026-06-08"
    },
    {
        id: 10,
        slug: "article10",
        title: "City Hosts Annual Music Festival",
        description: "A celebration of local and international music talent.",
        imageUrl: "/images/musicfestival.jpg",
        category: "Entertainment",
        author: "Grace Lee",
        content: "The city is hosting its annual music festival, showcasing talented local and international artists.",
        publishedAt: "2026-06-09"
    }

]

export const categories: category[] = [
    {
        id: 1,
        slug: "Healthcare",
        name: "Healthcare"
    },
    {
        id: 2,
        slug: "Environment",
        name: "Environment"
    },
    {
        id: 3,
        slug: "Business",
        name: "Business"
    },
    {
        id: 4,
        slug: "Entertainment",
        name: "Entertainment"
    },
    {
        id: 5,
        slug: "Education",
        name: "Education"
    },
    {
        id: 6,
        slug: "Food",
        name: "Food"
    }
]

export const authors: author[] = [
    {
        id: 1,
        slug: "john-doe",
        name: "John Doe",
        bio: "John is a seasoned journalist with over 10 years of experience in healthcare reporting.",
        profileImageUrl: "/images/authors/john_doe.jpg"
    },
    {
        id: 2,
        slug: "jane-smith",
        name: "Jane Smith",
        bio: "Jane specializes in environmental issues and has been recognized for her investigative reporting.",
        profileImageUrl: "/images/authors/jane_smith.jpg"
    },
    {
        id: 3,
        slug: "alice-johnson",
        name: "Alice Johnson",
        bio: "Alice covers business news and has a keen eye for market trends and economic developments.",
        profileImageUrl: "/images/authors/alice_johnson.jpg"
    },
    {
        id: 4,
        slug: "grace-lee",
        name: "Grace Lee",
        bio: "Grace loves to write articles about whats happening in the entertainment industry.",
        profileImageUrl: "/images/authors/grace_lee.jpg"
    },
    {
        id: 5,
        slug: "frank-miller",
        name: "Frank Miller",
        bio: "Frank likes to cover education new as he believes it's important to keep people informed in one of the most important sectors.",
        profileImageUrl: "/images/authors/frank_miller.jpg"
    }
]