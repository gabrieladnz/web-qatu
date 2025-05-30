import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { ProductSaleComponent } from './product-sale.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { TokenService } from '../../core/services/token/token.service';

class MockAuthService {
    async getUserById(userId: string): Promise<any> {
        return { isSeller: false };
    }
}

class MockTokenService {
    isAuthenticated(): boolean {
        return false;
    }
    getUserId(): string | null {
        return 'mock-user-id';
    }
}

class MockMatDialog {
    open(): any {
        return {
            afterClosed: () => ({
                subscribe: (callback: any) => { }
            })
        };
    }
}

describe('ProductSaleComponent', () => {
    let component: ProductSaleComponent;
    let fixture: ComponentFixture<ProductSaleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ProductSaleComponent,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: TokenService, useClass: MockTokenService },
                { provide: MatDialog, useClass: MockMatDialog }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductSaleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
