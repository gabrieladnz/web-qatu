// Libs
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// Services
import { ApiService } from '../../api/api.service';
import { TokenService } from '../token/token.service';

// Interfaces
import { BecomeSellerResponse, SellerOrdersResponse } from './client.interface';

@Injectable({
    providedIn: 'root'
})
export class ClientService extends ApiService {

    constructor(protected override http: HttpClient, private tokenService: TokenService) {
        super(http);
    }

    public async getPurchasesOrders(): Promise<SellerOrdersResponse> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.get<SellerOrdersResponse>('orders/my-orders', {}, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error
            };

            throw errorResponse;
        }
    }

    public async getSellerOrders(): Promise<SellerOrdersResponse> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.get<SellerOrdersResponse>('orders/seller-orders', {}, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error
            };

            throw errorResponse;
        }
    }

    public async updateOrderStatus(orderId: string, body: unknown): Promise<unknown> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.patch<unknown>(`orders/${orderId}/status`, body, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error
            };

            throw errorResponse;
        }
    }

    public async becomeSeller(userId: string): Promise<BecomeSellerResponse> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.patch<BecomeSellerResponse>(`users/${userId}/become-seller`, {}, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error
            };

            throw errorResponse;
        }
    }
}
