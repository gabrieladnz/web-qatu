// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// Services
import { ApiService } from '../../api/api.service';

// Interfaces
import { SearchProductRequest, SearchProductsResponse, ProductResponse, CreateProductRequest, CreateReviewRequest, CreateReviewResponse, DeleteProductResponse } from './product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductService extends ApiService {
    constructor(protected override http: HttpClient) {
        super(http);
    }

    public async getProducts(
        params?: SearchProductRequest
      ): Promise<SearchProductsResponse> {
        try {
          return await lastValueFrom(
            this.get<SearchProductsResponse>('products', params)
          );
        } catch (error) {
          const errorResponse = {
            success: false,
            message: error,
          };
      
          throw errorResponse;
        }
      }

    public async getProductById(productId: string): Promise<ProductResponse> {
        try {
            return await lastValueFrom(
                this.get<ProductResponse>(`products/${productId}`)
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
