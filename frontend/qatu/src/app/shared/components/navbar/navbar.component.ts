// Libs
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

// Services
import { ProductService } from '../../../core/services/product/product.service';

// Enums
import { CategoryType } from './../../enums/category-type.enum';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    @Output() products = new EventEmitter<Product[]>();
    protected searchValue: string = '';
    protected CategoryType = CategoryType;

    constructor(private productService: ProductService, private router: Router) { }

    protected async search() {
        const productList = await this.productService.getProducts({
            title: this.searchValue,
        });
        this.products.emit(productList);
    }

    protected searchToCategory(category: string): void {
        this.router.navigate(['/search'], {
            queryParams: { category }
        });
    }
}
