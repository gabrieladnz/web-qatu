// Libs
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

// Enums
import { CategoryType } from './../../enums/category-type.enum';

// Components
import { ModalCartComponent } from '../modals/modal-cart/modal-cart.component';

// Services
import { TokenService } from '../../../core/services/token/token.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit{
    @Output() products = new EventEmitter<Product[]>();
    protected searchValue: string = '';
    protected CategoryType = CategoryType;
    protected selectedCategory: string = '';
    protected isAuthenticated: boolean = false;

    constructor(private router: Router, public dialog: MatDialog, private tokenService: TokenService) { }

    ngOnInit(): void {
        this.checkAuthStatus();
    }
    
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

    protected openModalNotifications(): void {
        // TODO: Implementar abertura do modal de notificações
    }

    private checkAuthStatus(): void {
        this.isAuthenticated = this.tokenService.isAuthenticated();
    }
}
