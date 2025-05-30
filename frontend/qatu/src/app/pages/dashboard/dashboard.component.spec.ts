import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard.component';
import { ProductService } from '../../core/services/product/product.service';

class MockProductService {
    async getProducts(): Promise<any> {
        return { productsWithAverage: [] };
    }
}

class MockMatDialog {
    open() {
        return {
            afterClosed: () => ({ subscribe: (callback: any) => callback() })
        };
    }
}

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DashboardComponent,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: ProductService, useClass: MockProductService },
                { provide: MatDialog, useClass: MockMatDialog }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
