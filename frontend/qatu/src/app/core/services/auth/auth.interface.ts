export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
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
