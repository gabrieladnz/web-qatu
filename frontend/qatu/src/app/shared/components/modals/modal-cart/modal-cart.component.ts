// Libs
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaces
import { Cart, CartItem } from '../../../../core/services/cart/cart.interface';

// Services
import { CartService } from '../../../../core/services/cart/cart.service';
import { TokenService } from '../../../../core/services/token/token.service';

@Component({
    selector: 'app-modal-cart',
    imports: [RouterModule],
    templateUrl: './modal-cart.component.html',
    styleUrl: './modal-cart.component.scss'
})
export class ModalCartComponent implements OnInit {
    protected products!: Cart;
    protected isAuthenticated: boolean = false;
    protected snackBar = inject(MatSnackBar);

    constructor(private dialog: MatDialog, private cartService: CartService, private tokenService: TokenService, private router: Router) { }

    ngOnInit(): void {
        this.listProductsCart();
        this.checkAuthStatus();
    }

    protected async listProductsCart(): Promise<void> {
        try {
            this.products = await this.cartService.getCart();
        } catch (error) {
            console.error('Erro ao listar produtos no carrinho:', error);
        }
    }

    protected decreaseQuantity(product: CartItem): void {
        if (product.quantity > 1) {
            product.quantity--;

            this.removeProduct(product.product._id);
        }
    }

    protected async increaseQuantity(product: CartItem): Promise<void> {
        await this.cartService.addToCart({ productId: product.product._id, seller: product.product.seller, quantity: 1 });
        this.listProductsCart();
    }

    protected async removeProduct(productId: string): Promise<void> {
        try {
            await this.cartService.removeFromCart(productId);
            this.listProductsCart();
        } catch (error) {
            this.snackBar.open('Erro ao remover produto.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
        }
    }

    protected closeCart(): void {
        this.dialog.closeAll();
    }

    protected async finishPurchase(): Promise<void> {
        try {
            const checkoutResponse = await this.cartService.checkout();

            this.snackBar.open('Redirecionando para tela de pagamento.', 'Fechar', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });

            this.closeCart();

            this.router.navigate(['/payment', checkoutResponse.order._id]);
        } catch (error) {
            this.snackBar.open('Erro ao finalizar compra.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
        }
    }

    private checkAuthStatus(): void {
        this.isAuthenticated = this.tokenService.isAuthenticated();
    }
}
