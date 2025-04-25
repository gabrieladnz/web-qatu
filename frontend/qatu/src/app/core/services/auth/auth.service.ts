// Libs
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// Services
import { ApiService } from '../../api/api.service';

// Interfaces
import { LoginRequest, LoginResponse } from './auth.interface';
import { RegisterRequest, RegisterResponse } from './auth.interface'; // você vai precisar criar essas interfaces também

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    public async login(body: LoginRequest): Promise<LoginResponse> {
        try {
            return await lastValueFrom(
                this.post<LoginResponse>('users/login', body),
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
            };

            throw errorResponse;
        }
    }

    public async register(body: RegisterRequest): Promise<RegisterResponse> {
        try {
            return await lastValueFrom(
                this.post<RegisterResponse>('users/register', body),
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