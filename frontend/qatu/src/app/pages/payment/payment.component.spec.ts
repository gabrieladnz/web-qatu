import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { provideNgxMask } from 'ngx-mask';
import { PaymentComponent } from './payment.component';
import { PaymentService } from '../../core/services/payment/payment.service';

class MockActivatedRoute {
    snapshot = {
        paramMap: convertToParamMap({ orderId: 'test-order-id' })
    };
}

class MockPaymentService {
    processPayment(paymentData: any) {
        return Promise.resolve({ success: true });
    }
}

class MockMatSnackBar {
    open(message: string, action?: string, config?: any) {
        return {
            onAction: () => of({}),
            afterDismissed: () => of({})
        };
    }
}

describe('PaymentComponent', () => {
    let component: PaymentComponent;
    let fixture: ComponentFixture<PaymentComponent>;
    let paymentService: PaymentService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PaymentComponent,
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                provideNgxMask(),
                { provide: PaymentService, useClass: MockPaymentService },
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                { provide: MatSnackBar, useClass: MockMatSnackBar },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        paymentService = TestBed.inject(PaymentService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
