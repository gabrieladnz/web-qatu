// Libs
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// Services
import { ApiService } from '../../api/api.service';

// Interfaces
import { LoginRequest, LoginResponse } from './auth.interface';

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

    // TODO: Implementar função de cadastro aqui
}
