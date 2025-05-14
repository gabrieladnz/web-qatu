// Libs
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

// Enums
import { CategoryType } from './../../enums/category-type.enum';

// Components
import { ModalCartComponent } from '../modals/modal-cart/modal-cart.component';

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

    constructor(private router: Router, public dialog: MatDialog) { }

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

    protected openModalCart(): void {
        this.dialog.open(ModalCartComponent, {
            width: '400px',
            height: '100%',
            panelClass: 'custom__modal',
            disableClose: false,
            position: {
                right: '0'
            },
        });
    }
}
