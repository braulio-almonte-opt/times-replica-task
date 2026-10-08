export interface Category {
    id: number;
    slug: string;
    name: string;
}

export const categories = [
    {
        id: 1,
        slug: "healthcare",
        name: "Healthcare"
    },
    {
        id: 2,
        slug: "environment",
        name: "Environment"
    },
    {
        id: 3,
        slug: "business",
        name: "Business"
    },
    {
        id: 4,
        slug: "entertainment",
        name: "Entertainment"
    },
    {
        id: 5,
        slug: "education",
        name: "Education"
    },
    {
        id: 6,
        slug: "food",
        name: "Food"
    },
    {
        id: 7,
        slug: "transportation",
        name: "Transportation"
    },
    {
        id: 8,
        slug: "health",
        name: "Health"
    }
] as const satisfies readonly Category[];

export type CategorySlug = (typeof categories)[number]["slug"];
