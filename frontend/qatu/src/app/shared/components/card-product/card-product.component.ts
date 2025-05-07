// Libs
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

@Component({
    selector: 'app-card-product',
    imports: [CommonModule],
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
