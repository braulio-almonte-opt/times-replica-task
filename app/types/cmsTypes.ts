export interface ConnectionNode<TNode>{
    edges: Array<{
        node: TNode;
    }>;
}

export interface Asset{
    url: string;
    filename?: string;
    title?: string;
}

export interface Author{
    slug: string;
    title: string;
    bio?: string;

    profileimageConnection?: ConnectionNode<Asset>;
}

export interface Category{
    title: string;
    slug: string;
    description?: string;
}

export interface Article{
    title: string;
    slug: string;
    description: string;
    content: string;
    publishedat: string;
    featured: boolean;

    imageConnection?: ConnectionNode<Asset>;
    authorConnection?: ConnectionNode<Author>;
    categoryConnection?: ConnectionNode<Category>;
}

export interface ArticleResponse{
    all_article: {
        items: Article[];
    };
}

// export interface SingleArticleResponse{
//     all_article:{
//         items: Article[];
//     };
// }

export interface AuthorResponse{
    all_author:{
        items: Author[];
    }
}

// export interface SingleAuthorResponse{
//     all_author:{
//         items:Author[];
//     }
// }

export interface CategoryResponse{
    all_category:{
        items:Category[];
    }
}

// export interface SingleCategoryResponse{
//     all_category:{
//         items:[Category];
//     }
// }