// Libs
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Product, SearchProductRequest } from '../../core/services/product/product.interface';

// Services
import { ProductService } from '../../core/services/product/product.service';

// Components
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';

@Component({
    selector: 'app-search',
    imports: [
        NavbarComponent,
        FooterComponent,
        CardProductComponent,
        AsyncPipe,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
    protected arraySubject = new BehaviorSubject<Product[]>([]);
    protected listProducts = this.arraySubject.asObservable();

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(async (params) => {
            const filters: SearchProductRequest = {};
            if (params['category']) filters.category = params['category'];
            if (params['title']) filters.search = params['title'];
            if (params['minPrice']) filters.minPrice = +params['minPrice'];
            if (params['maxPrice']) filters.maxPrice = +params['maxPrice'];
            if (params['page']) filters.page = +params['page'];

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

            const { currentPage, totalPages, totalProducts } = response.pagination;
            console.log('Página Atual:', currentPage);
            console.log('Total de Páginas:', totalPages);
            console.log('Total de Produtos:', totalProducts);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            this.updateArray([]);
        }
    }
}
