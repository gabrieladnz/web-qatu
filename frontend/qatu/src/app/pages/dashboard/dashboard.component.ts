// Libs
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Components
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';

// Interfaces
import { Product } from '../../core/services/product/product.interface';
import { ProductService } from '../../core/services/product/product.service';

// Enums
import { CategoryType } from '../../shared/enums/category-type.enum';

@Component({
    selector: 'app-dashboard',
    imports: [NavbarComponent, FooterComponent, CardProductComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    protected listProducts: Product[] = [];
    protected CategoryType = CategoryType;

    constructor(private productService: ProductService, private router: Router) {}

    ngOnInit(): void {
        this.getProducts();
    }

    protected async getProducts(): Promise<void> {
        try {
            const products = await this.productService.getProducts();
            this.listProducts = products.slice(0, 8);
        } catch (error) {
            console.error('Error ao buscar produtos:', error);
        }
    }

    protected searchToCategory(category: string): void {
        this.router.navigate(['/search'], {
            queryParams: { category }
        });
    }
}
