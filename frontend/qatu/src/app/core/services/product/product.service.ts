import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ProductRequest, ProductResponse } from './product.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductService extends ApiService {
    constructor(protected override http: HttpClient) {
        super(http);
    }

    public async getProducts(
        params: ProductRequest
    ): Promise<ProductResponse[]> {
        try {
            return await lastValueFrom(
                this.get<ProductResponse[]>('products/all', params)
            );
        } catch (error) {
            return [];
            const errorResponse = {
                sucess: false,
                message: error,
            };
            throw errorResponse;
        }
    }
}
