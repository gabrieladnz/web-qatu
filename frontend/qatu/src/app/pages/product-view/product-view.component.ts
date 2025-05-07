// Libs
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

// Interfaces
import { Product } from '../../core/services/product/product.interface';

// Services
import { ProductService } from '../../core/services/product/product.service';

@Component({
    selector: 'app-product-view',
    imports: [NavbarComponent, FooterComponent, CommonModule],
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit {
    protected product!: Product;

    constructor(private productService: ProductService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) this.getProductById(id);
        });
    }

    protected async getProductById(productId: string): Promise<void> {
        try {
            this.product = await this.productService.getProductById(productId);
        } catch (error) {
            console.error('Error ao buscar por produto:', error);
        }
    }
}
