export interface Product {
    _id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    ratings?: Review[];
    averageRating?: number;
}

export interface Review {
    score: number;
    comment: string;
    _id: string;
}

export interface SearchProductsResponse {
    productsWithAverage: ProductResponse[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProducts: number;
    };
  }

export interface SearchProductRequest {
    title?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'desc' | 'asc';
    page?: number;
}

export interface CreateProductRequest {
    category: string;
    image: string;
    title: string;
    description: string;
    price: number;
    stock: number;
}

export interface CreateReviewRequest {
    score: number;
    comment: string;
}

export interface CreateReviewResponse {
    success: boolean;
    message: string;
}

// TODO: Considerar criar uma interface genérica pra respostas padrão da API. Conversar com o time
export interface DeleteProductResponse {
    success: boolean;
    message: string;
}

export interface ProductResponse extends Product {}
