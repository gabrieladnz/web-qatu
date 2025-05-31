// Libs
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { ProductService } from '../../../../core/services/product/product.service';

// Interfaces
import { CreateReviewRequest } from '../../../../core/services/product/product.interface';

export interface ModalCreateReviewData {
    productId: string;
}

@Component({
    selector: 'app-modal-create-review',
    imports: [
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    templateUrl: './modal-create-review.component.html',
    styleUrl: './modal-create-review.component.scss'
})
export class ModalCreateReviewComponent implements OnInit {
    protected reviewForm: FormGroup;
    protected stars: number[] = [1, 2, 3, 4, 5];
    protected selectedScore: number = 0;
    protected hoverScore: number = 0;
    protected isLoading: boolean = false;
    protected errorMessage: string = '';
    protected snackBar = inject(MatSnackBar);

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        public dialogRef: MatDialogRef<ModalCreateReviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ModalCreateReviewData
    ) {
        this.reviewForm = this.fb.group({
            score: [0, [Validators.required, Validators.min(1)]],
            comment: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(500)
            ]]
        });
    }

    ngOnInit(): void {
        if (!this.data?.productId) {
            this.dialogRef.close();
        }
    }

    protected setScore(score: number): void {
        this.selectedScore = score;
        this.reviewForm.patchValue({ score });
        this.clearError();
    }

    protected setHoverScore(score: number): void {
        this.hoverScore = score;
    }

    protected closeModal(): void {
        this.dialogRef.close();
    }

    protected async createReview(): Promise<void> {
        if (this.reviewForm.invalid || this.selectedScore === 0) {
            this.markFormGroupTouched();
            return;
        }

        this.isLoading = true;
        this.clearError();

        try {
            const reviewData: CreateReviewRequest = {
                score: this.selectedScore,
                comment: this.reviewForm.get('comment')?.value.trim()
            };

            const response = await this.productService.createReview(this.data.productId, reviewData);
            this.dialogRef.close(response);

            this.snackBar.open('Avaliação publicada.', 'Fechar', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });
        } catch (error: any) {
            this.snackBar.open('Erro ao enviar avaliação.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });

            this.errorMessage = error?.message || 'Erro ao enviar avaliação. Tente novamente.';
        } finally {
            this.isLoading = false;
        }
    }

    protected clearError(): void {
        this.errorMessage = '';
    }

    protected get hasGeneralError(): boolean {
        return this.errorMessage.length > 0;
    }

    private markFormGroupTouched(): void {
        Object.keys(this.reviewForm.controls).forEach(key => {
            const control = this.reviewForm.get(key);
            control?.markAsTouched();
        });
    }

    protected get formControls() {
        return this.reviewForm.controls;
    }

    protected hasFieldError(fieldName: string, errorType?: string): boolean {
        const field = this.reviewForm.get(fieldName);
        if (!field || !field.touched) return false;

        if (errorType) {
            return field.hasError(errorType);
        }

        return field.invalid;
    }

    protected getFieldErrorMessage(fieldName: string): string {
        const field = this.reviewForm.get(fieldName);
        if (!field || !field.errors) return '';

        const errors = field.errors;

        if (errors['required']) {
            return fieldName === 'score'
                ? 'Por favor, selecione uma avaliação'
                : 'O comentário é obrigatório';
        }

        if (errors['minlength']) {
            return `O comentário deve ter pelo menos ${errors['minlength'].requiredLength} caracteres`;
        }

        if (errors['maxlength']) {
            return `O comentário não pode ter mais de ${errors['maxlength'].requiredLength} caracteres`;
        }

        if (errors['min']) {
            return 'Por favor, selecione uma avaliação';
        }

        return 'Campo inválido';
    }

    protected get isFormValid(): boolean {
        return this.reviewForm.valid && this.selectedScore > 0;
    }
}
