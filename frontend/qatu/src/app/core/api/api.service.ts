// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Models
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private BASE_URL: string = environment.baseUrl;

    constructor(protected http: HttpClient) { }

    public get<T>(
        url: string,
        params?: unknown,
        token?: string
    ): Observable<T> {
        return this.http.get<T>(`${this.BASE_URL}/${url}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            params:
                params && typeof params === 'object'
                    ? { ...params }
                    : undefined,
        });
    }

    public post<T>(url: string, body?: unknown, token?: string): Observable<T> {
        return this.http.post<T>(`${this.BASE_URL}/${url}`, body, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
    }

    public put<T>(url: string, body: unknown): Observable<T> {
        return this.http.put<T>(`${this.BASE_URL}/${url}`, body);
    }

    public delete<T>(url: string, body?: unknown, token?: string): Observable<T> {
        return this.http.delete<T>(`${this.BASE_URL}/${url}`, {
            body,
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
    }

    public patch<T>(url: string, body: unknown, token?: string): Observable<T> {
        return this.http.patch<T>(`${this.BASE_URL}/${url}`, body, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
    }
}
