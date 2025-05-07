// Libs
import { Component, OnInit } from '@angular/core';

// Components
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';

// Interfaces
import { Product } from '../../core/services/product/product.interface';
import { ProductService } from '../../core/services/product/product.service';

@Component({
    selector: 'app-dashboard',
    imports: [NavbarComponent, FooterComponent, CardProductComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    protected listProducts: Product[] = [];

    constructor(private productService: ProductService) {}

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
}
