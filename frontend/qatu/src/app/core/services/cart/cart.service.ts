// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// Services
import { ApiService } from '../../api/api.service';
import { TokenService } from '../token/token.service';

// Interfaces
import { CartRequest, Cart, CartResponse } from './cart.interface';

@Injectable({
    providedIn: 'root',
})
export class CartService extends ApiService {
    constructor(protected override http: HttpClient, private tokenService: TokenService) {
        super(http);
    }

    public async addToCart(request: CartRequest): Promise<CartResponse> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.post<CartResponse>('cart/add', request, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async getCart(): Promise<Cart> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.get<Cart>('cart', {}, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async removeFromCart(productId: string): Promise<CartResponse> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.delete<CartResponse>('cart/remove', { productId }, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async checkout(): Promise<unknown> {
        // TODO: Alinhar retornos após integração com o backend
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.post<unknown>('orders/checkout', {}, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }
}
