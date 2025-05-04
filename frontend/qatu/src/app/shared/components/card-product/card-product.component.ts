// Libs
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

@Component({
    selector: 'app-card-product',
    imports: [],
    templateUrl: './card-product.component.html',
    styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
    @Input() product: Product[] = [];

    constructor(private router: Router) { }

    protected openProductDetails(productId: number): void {
        this.router.navigate(['/product', productId]);
    }
}
