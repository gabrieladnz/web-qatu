// Libs
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

// Services
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
    selector: 'app-card-product',
    imports: [CommonModule],
    templateUrl: './card-product.component.html',
    styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
    @Input() product: Product[] = [];

    constructor(private router: Router, private cartService: CartService) { }

    protected openProductDetails(productId: string): void {
        this.router.navigate(['/product', productId]);
    }

    protected async addToCart(itemProduct: Product): Promise<void> {
        try {
            this.cartService.addToCart({
                productId: itemProduct._id,
                quantity: 1,
            })
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho', error);
        }
    }
}
