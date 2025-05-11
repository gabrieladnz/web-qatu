// Interfaces
import { Product } from "../product/product.interface";

export interface CartRequest {
    productId: string;
    quantity: number;
}

export interface CartResponse {
    message: string;
    cart: [
        _id: string,
        user: number,
        total: number,
        items: [
            product: string,
            quantity: number,
            _id: string
        ]
    ];
}

export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    total: number;
}

export interface CartItems {
    items: CartItem[];
    total: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
    _id: string;
}
