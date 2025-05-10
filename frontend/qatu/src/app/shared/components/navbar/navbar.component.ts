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
    protected selectedCategory: string = '';

    constructor(private router: Router) {}

    protected search(): void {
        if (!this.searchValue.trim()) return;

        this.router.navigate(['/search'], {
            queryParams: {
                category: this.selectedCategory || undefined,
                title: this.searchValue || undefined,
            },
        });
    }

    protected searchToCategory(category?: string): void {
        this.selectedCategory = category || '';

        this.router.navigate(['/search'], {
            queryParams: {
                category: this.selectedCategory || undefined,
                title: this.searchValue || undefined,
            },
        });
    }
}
