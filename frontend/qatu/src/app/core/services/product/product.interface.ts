export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    imageUrl: string;
}

export interface ProductRequest {
    query?: string;
    category?: string;
    priceRange?: string;
    order?: 'desc' | 'asc';
}

export interface ProductResponse extends Product {}