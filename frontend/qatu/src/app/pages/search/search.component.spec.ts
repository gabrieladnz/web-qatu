import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { SearchComponent } from './search.component';
import { ProductService } from '../../core/services/product/product.service';

class MockActivatedRoute {
    queryParams = of({});
    snapshot = {
        queryParams: {}
    };
}

class MockProductService {
    getProducts(filters: any) {
        return Promise.resolve({
            productsWithAverage: [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalProducts: 0,
            },
        });
    }
}

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SearchComponent,
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                { provide: ProductService, useClass: MockProductService },
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
