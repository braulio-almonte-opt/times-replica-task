export interface Arcticle {
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    content: string;
    publishedAt: string;
}

export const articles: Arcticle[] = [
    {
        slug: "article1",
        title: "Hospital Opened Nearby",
        description: "This is the first modern hospital in the area.",
        imageUrl: "/images/hospital.jpg",
        content: "The new hospital is equipped with state-of-the-art medical technology and staffed by highly trained professionals. It aims to provide top-notch healthcare services to the local community.",
        publishedAt: "2024-06-01"
    },
    {
        slug: "article2",
        title: "River Dam Built as Flood Control",
        description: "It is expected to hold back floodwaters.",
        imageUrl: "/images/riverdam.jpg",
        content: "The newly constructed river dam is designed to manage water flow and prevent flooding in the surrounding areas. It will help protect homes and businesses from potential flood damage.",
        publishedAt: "2024-06-02"
    },
    {
        slug: "article3",
        title: "Supermarket Prices expected to be rise soon",
        description: "Do your groceries while you can.",
        imageUrl: "/images/supermarket.jpeg",
        content: "Due to recent supply chain disruptions and increased demand, supermarket prices are expected to rise in the coming months. Consumers are advised to stock up on essential items while prices are still reasonable.",
        publishedAt: "2024-06-03"
    }

]