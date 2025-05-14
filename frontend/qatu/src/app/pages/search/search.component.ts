// Libs
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {
    MatPaginatorModule,
    PageEvent,
    MAT_PAGINATOR_DEFAULT_OPTIONS,
} from '@angular/material/paginator';

// Interfaces
import {
    Product,
    SearchProductRequest,
} from '../../core/services/product/product.interface';

// Services
import { ProductService } from '../../core/services/product/product.service';

// Components
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';

@Component({
    selector: 'app-search',
    imports: [
        CommonModule,
        NavbarComponent,
        FooterComponent,
        CardProductComponent,
        AsyncPipe,
        MatPaginatorModule,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    providers: [
        {
            provide: MatPaginatorIntl,
            useClass: class extends MatPaginatorIntl {
                override getRangeLabel = (
                    page: number,
                    pageSize: number,
                    length: number
                ) => {
                    if (length === 0 || pageSize === 0) {
                        return `0 de ${length}`;
                    }
                    length = Math.max(length, 0);
                    const startIndex = page * pageSize;
                    const endIndex =
                        startIndex < length
                            ? Math.min(startIndex + pageSize, length)
                            : startIndex + pageSize;
                    return `${startIndex + 1}-${endIndex} de ${length}`;
                };
            },
        },
        {
            provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
            useValue: {
                hidePageSize: true,
                showFirstLastButtons: true,
                formFieldAppearance: 'outline',
            },
        },
    ],
})
export class SearchComponent implements OnInit {
    protected arraySubject = new BehaviorSubject<Product[]>([]);
    protected listProducts = this.arraySubject.asObservable();

    protected currentPage = 1;
    protected totalPages = 1;
    protected totalProducts = 0;
    protected pageSize = 8;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(async (params) => {
            const filters: SearchProductRequest = {};
            if (params['category']) filters.category = params['category'];
            if (params['title']) filters.search = params['title'];
            if (params['minPrice']) filters.minPrice = +params['minPrice'];
            if (params['maxPrice']) filters.maxPrice = +params['maxPrice'];
            if (params['page']) filters.page = +params['page'];

            this.currentPage = filters.page || 1;

            await this.fetchProducts(filters);
        });
    }

    protected updateArray(array: Product[]): void {
        this.arraySubject.next(array);
    }

    private async fetchProducts(filters: SearchProductRequest): Promise<void> {
        try {
            const response = await this.productService.getProducts(filters);
            this.updateArray(response.productsWithAverage);

            const { currentPage, totalPages, totalProducts } =
                response.pagination;

            this.currentPage = currentPage;
            this.totalPages = totalPages;
            this.totalProducts = totalProducts;

            console.log('Página Atual:', currentPage);
            console.log('Total de Páginas:', totalPages);
            console.log('Total de Produtos:', totalProducts);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            this.updateArray([]);

            this.totalProducts = 0;
        }
    }

    protected handlePageEvent(event: PageEvent): void {
        const newPage = event.pageIndex + 1;

        const queryParams = {
            ...this.route.snapshot.queryParams,
            page: newPage,
        };
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: queryParams,
            queryParamsHandling: 'merge',
        });
    }
}
