// Libs
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

// Services
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatFormFieldModule,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    public registerForm: FormGroup;
    public hidePassword: boolean = true;
    public registerFailed: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    public passwordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }

    public async register(): Promise<void> {
        this.registerFailed = false;

        if (this.registerForm.valid) {
            try {
                const response = await this.authService.register(
                    this.registerForm.value
                );
                if (response.success) {
                    this.router.navigate(['/auth/login']);
                } else {
                    this.registerFailed = true;
                }
            } catch (error) {
                this.registerFailed = true;
                console.error(error);
            }
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
