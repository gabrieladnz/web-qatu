// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// Services
import { ApiService } from '../../api/api.service';

// Interfaces
import { SearchProductRequest, ProductResponse, CreateProductRequest, CreateReviewRequest, CreateReviewResponse, DeleteProductResponse, Product } from './product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductService extends ApiService {
    constructor(protected override http: HttpClient) {
        super(http);
    }

    public async getProducts(
        params?: SearchProductRequest
    ): Promise<ProductResponse> {
        try {
            return await lastValueFrom(
                this.get<ProductResponse>('products', params)
            );
        } catch (error) {
            const errorResponse = {
                sucess: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async getProductById(productId: string): Promise<Product> {
        try {
            return await lastValueFrom(
                this.get<Product>(`products/${productId}`)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async createProduct(product: CreateProductRequest): Promise<ProductResponse> {
        try {
            return await lastValueFrom(
                this.post<ProductResponse>('products', product)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async updateProduct(productId: string, product: CreateProductRequest): Promise<ProductResponse> {
        try {
            return await lastValueFrom(
                this.put<ProductResponse>(`products/${productId}`, product)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async deleteProduct(productId: string): Promise<DeleteProductResponse> {
        try {
            return await lastValueFrom(
                this.delete<any>(`products/${productId}`)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async createReview(productId: string, review: CreateReviewRequest): Promise<CreateReviewResponse> {
        try {
            return await lastValueFrom(
                this.post<CreateReviewResponse>(`products/${productId}/review`, review)
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
