export interface Author {
    id: number;
    slug: string;
    name: string;
    bio: string;
    profileImageUrl: string;
}

export const authors = [
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
    },
    {
        id: 6,
        slug: "bob-wilson",
        name: "Bob Wilson",
        bio: "Bob Wilson dedicates to find free family activities and reports on them so the local community comes together more easily",
        profileImageUrl: "/images/emptynews.jpg"
    },
    {
        id: 7,
        slug: "charlie-brown",
        name: "Charlie Brown",
        bio: "Charlie covers local transportation and city planning.",
        profileImageUrl: "/images/emptynews.jpg"
    },
    {
        id: 8,
        slug: "david-lee",
        name: "David Lee",
        bio: "David reports on community health and local wellness programs.",
        profileImageUrl: "/images/emptynews.jpg"
    },
    {
        id: 9,
        slug: "eve-davis",
        name: "Eve Davis",
        bio: "Eve covers local food, farms, and community markets.",
        profileImageUrl: "/images/emptynews.jpg"
    }
] as const satisfies readonly Author[];

export type AuthorSlug = (typeof authors)[number]["slug"];
