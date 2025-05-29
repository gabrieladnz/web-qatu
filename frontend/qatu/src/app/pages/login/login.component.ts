// Libs
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

// Services
import { AuthService } from '../../core/services/auth/auth.service';
import { TokenService } from '../../core/services/token/token.service';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatFormFieldModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    protected loginForm: FormGroup;
    protected hidePassword: boolean = true;
    protected loginFailed: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private tokenService: TokenService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    protected passwordVisibility(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        this.hidePassword = !this.hidePassword;
    }

    protected async login(): Promise<void> {
        this.loginFailed = true;

        if (this.loginForm.valid) {
            await this.authService
                .login(this.loginForm.value)
                .then((response) => {
                    if (response.success) {
                        this.tokenService.save(response.token);
                        this.tokenService.saveUserId(response._id);
                        this.loginFailed = false;
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.loginFailed = true;
                    }
                });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
