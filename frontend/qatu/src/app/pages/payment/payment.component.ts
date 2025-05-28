// Libs
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

// Services
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
    selector: 'app-payment',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        NavbarComponent,
        FooterComponent,
        MatIconModule,
        NgxMaskDirective
    ],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
    protected paymentForm!: FormGroup;
    protected orderId: string | null = null;
    protected isProcessing: boolean = false;
    protected snackBar = inject(MatSnackBar);

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private paymentService: PaymentService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getOrderId();
        this.createPaymentForm();
    }

    private getOrderId(): void {
        this.orderId = this.route.snapshot.paramMap.get('orderId');

        if (!this.orderId) {
            this.snackBar.open('ID do pedido não encontrado.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
            this.router.navigate(['/dashboard']);
        }
    }

    private createPaymentForm(): void {
        this.paymentForm = this.fb.group({
            cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
            cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
            cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
            cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
        });
    }

    protected async processPayment(): Promise<void> {
        if (this.paymentForm.valid && this.orderId) {
            const paymentData = {
                orderId: this.orderId,
                cardNumber: this.paymentForm.value.cardNumber,
                cvv: this.paymentForm.value.cvv,
                cpf: this.paymentForm.value.cpf,
                cep: this.paymentForm.value.cep
            };

            try {
                await this.paymentService.processPayment(paymentData);
                console.log('Dados do pagamento:', paymentData);

                this.snackBar.open('Pagamento realizado com sucesso!', 'Fechar', {
                    duration: 5000,
                    panelClass: ['success-snackbar']
                });

                this.router.navigate(['/client/purchases']);
            } catch (error) {
                this.snackBar.open('Erro no pagamento.', 'Fechar', {
                    duration: 5000,
                    panelClass: ['error-snackbar']
                });
            }
        }
    }
}
