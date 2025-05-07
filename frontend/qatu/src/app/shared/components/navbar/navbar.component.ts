// Libs
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

// Services
import { ProductService } from '../../../core/services/product/product.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    @Output() products = new EventEmitter<Product[]>();
    searchValue: string = '';

    constructor(private productService: ProductService) {}

    protected async search() {
        const productList = await this.productService.getProducts({
            title: this.searchValue,
        });
        this.products.emit(productList);
    }
}
