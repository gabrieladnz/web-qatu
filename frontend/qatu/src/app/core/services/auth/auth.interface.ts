export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    _id: string;
}
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface RegisterResponse {
    success: boolean;
    message: string;
}

export interface UserIdResponse {
    _id: string;
    name: string;
    email: string;
    __v: number;
    isSeller: boolean;
    role: 'buyer' | 'seller';
}
