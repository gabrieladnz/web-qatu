// Libs
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Services
import { ProductService } from '../../../../core/services/product/product.service';

// Enums
import { CategoryType } from '../../../enums/category-type.enum';

@Component({
    selector: 'app-modal-advertise-product',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './modal-advertise-product.component.html',
    styleUrl: './modal-advertise-product.component.scss'
})
export class ModalAdvertiseProductComponent implements OnInit {
    protected productForm: FormGroup;
    protected imagePreview: string | null = null;

    protected categoryOptions = [
        { value: CategoryType.TECNOLOGIA, label: 'Tecnologia' },
        { value: CategoryType.CASA_E_MOVEIS, label: 'Casa e Móveis' },
        { value: CategoryType.ESPORTE, label: 'Esportes' },
        { value: CategoryType.MODA, label: 'Moda' },
        { value: CategoryType.BELEZA, label: 'Beleza' },
        { value: CategoryType.INFANTIL, label: 'Infantil' }
    ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ModalAdvertiseProductComponent>,
        private productService: ProductService
    ) {
        this.productForm = this.fb.group({
            category: ['', Validators.required],
            title: ['', Validators.required],
            image: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0.01)]],
            stock: ['', [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit(): void { }

    protected onImageSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                this.imagePreview = reader.result as string;
                this.productForm.patchValue({
                    image: this.imagePreview
                });
                this.productForm.get('image')?.markAsTouched();
            };
            reader.readAsDataURL(file);
        }
    }

    protected async createAd(): Promise<void> {
        try {
            await this.productService.createProduct(this.productForm.value);
            this.dialogRef.close(true);
        } catch (error) {
            console.error("Erro na criação de um anúncio:", error);
            this.dialogRef.close(false);
        }
    }

    protected closeModal(): void {
        this.dialogRef.close();
    }
}
