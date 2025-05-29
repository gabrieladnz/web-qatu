// Libs
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Services
import { TokenService } from '../services/token/token.service';

export const authGuard: CanActivateFn = async (route, state) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    try {
        const isAuthenticated = await tokenService.isAuthenticated();

        if (!isAuthenticated) {
            return router.createUrlTree(['/auth/login'], {
                queryParams: { returnUrl: state.url },
            });
        }

        return true;
    } catch (error) {
        console.error('Erro no authGuard:', error);
        return router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: state.url },
        });
    }
};
