import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private type: 'sessionStorage' | 'localStorage' = 'localStorage';
    private readonly tokenUser = 'auth_token';

    constructor(private router: Router) { }

    public get(): string | null {
        return window[this.type].getItem(this.tokenUser);
    }

    public delete(): void {
        window[this.type].removeItem(this.tokenUser);
    }

    public save(token: string): void {
        window[this.type].setItem(this.tokenUser, token);
    }

    public async logout(): Promise<boolean> {
        this.delete();
        return this.router.navigate(['/auth/login'], {
            replaceUrl: true,
        });
    }
}
