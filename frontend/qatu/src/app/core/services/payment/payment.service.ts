// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// Services
import { ApiService } from '../../api/api.service';
import { TokenService } from '../token/token.service';

// Interfaces
import { PaymentRequestData } from './payment.interface';

@Injectable({
    providedIn: 'root',
})
export class PaymentService extends ApiService {
    constructor(protected override http: HttpClient, private tokenService: TokenService) {
        super(http);
    }

    public async processPayment(paymentData: PaymentRequestData): Promise<unknown> {
        try {
            const token = this.tokenService.get() || undefined;

            return await lastValueFrom(
                this.post<unknown>('payments/checkout', paymentData, token)
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
