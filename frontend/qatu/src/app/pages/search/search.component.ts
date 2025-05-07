// Libs
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Product } from '../../core/services/product/product.interface';

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

    constructor(private productService: ProductService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        // TODO: Adaptar lógica de busca a partir de diferentes parâmetros: Title, Category, MinPrice, MaxPrice...
        this.route.queryParams.subscribe(async (params) => {
            const category = params['category'];

            this.fetchProducts(category);
        });
    }

    protected updateArray(array: Product[]): void {
        this.arraySubject.next(array);
    }

    private async fetchProducts(category?: string): Promise<void> {
        try {
            const products = await this.productService.getProducts({ category });
            this.updateArray(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            this.updateArray([]);
        }
    }
}
