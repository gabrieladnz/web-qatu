// Libs
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

// Services
import { CartService } from '../../../core/services/cart/cart.service';
import { TokenService } from '../../../core/services/token/token.service';

@Component({
    selector: 'app-card-product',
    imports: [CommonModule],
    templateUrl: './card-product.component.html',
    styleUrl: './card-product.component.scss'
})
export class CardProductComponent implements OnInit {
    @Input() product: Product[] = [];
    protected isAuthenticated: boolean = false;
    protected snackBar = inject(MatSnackBar);

    constructor(private router: Router, private cartService: CartService, private tokenService: TokenService) { }

    ngOnInit(): void {
        this.checkAuthStatus();
    }

    protected openProductDetails(productId: string): void {
        this.router.navigate(['/product', productId]);
    }

    protected async addToCart(itemProduct: Product): Promise<void> {
        try {
            this.cartService.addToCart({
                productId: itemProduct._id,
                seller: itemProduct.seller,
                quantity: 1,
            })

             this.snackBar.open('Produto adicionado ao carrinho', 'Fechar', {
                    duration: 5000,
                    panelClass: ['success-snackbar']
                });
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho', error);
        }
    }

    private checkAuthStatus(): void {
        this.isAuthenticated = this.tokenService.isAuthenticated();
    }
}
