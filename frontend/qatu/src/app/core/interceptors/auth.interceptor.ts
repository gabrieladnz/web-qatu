// Libs
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

// Services
import { TokenService } from '../services/token/token.service';

export const hasAuthError = signal<boolean>(false);
export const hasConnectionError = signal<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const tokenService = inject(TokenService);
    const snackBar = inject(MatSnackBar);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                hasAuthError.set(true);
                tokenService.delete();
            }

            if (error.status === 0) {
                hasConnectionError.set(true);
                tokenService.delete();
                snackBar.open('Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.', 'Fechar', {
                    duration: 5000
                });
            }

            return throwError(() => error);
        })
    );
};
