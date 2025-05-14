// Libs
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Services
import { TokenService } from '../services/token/token.service';
import { hasAuthError } from '../interceptors/auth.interceptor';

export const authGuard: CanActivateFn = async (route, state) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    const isAuthenticated = await tokenService.isAuthenticated();

    const noAuthErrors = !hasAuthError();

    if (isAuthenticated && noAuthErrors) {
        return true;
    }

    return router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url },
    });
};
