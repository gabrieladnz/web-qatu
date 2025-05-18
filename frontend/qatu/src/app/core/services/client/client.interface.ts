
export interface User {
    id: string;
    name: string;
    email: string;
    isSeller: boolean;
}

export interface ProductInfo {
    _id: string;
    title: string;
    price: number;
}

export interface OrderProduct {
    product: ProductInfo;
    quantity: number;
    seller: string;
    _id: string;
}

export interface Order {
    _id: string;
    buyer: BuyerInfo;
    products: OrderProduct[];
    total: number;
    status: string;
    createdAt: string;
    __v: number;
}

export interface BuyerInfo {
    _id: string;
    name: string;
    email: string;
}

export interface SellerOrdersResponse {
    success: boolean;
    count: number;
    orders: Order[];
}

export interface BecomeSellerResponse {
    success: boolean;
    message: string;
    user: User;
}
