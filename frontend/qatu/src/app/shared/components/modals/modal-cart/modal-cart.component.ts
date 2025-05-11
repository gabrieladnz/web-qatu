// Libs
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Interfaces
import { Cart, CartItem } from '../../../../core/services/cart/cart.interface';

// Services
import { CartService } from '../../../../core/services/cart/cart.service';

@Component({
    selector: 'app-modal-cart',
    imports: [],
    templateUrl: './modal-cart.component.html',
    styleUrl: './modal-cart.component.scss'
})
export class ModalCartComponent implements OnInit {
    products!: Cart;

    constructor(private dialog: MatDialog, private cartService: CartService) { }

    ngOnInit(): void {
        this.listProductsCart();
    }

    protected async listProductsCart(): Promise<void> {
        try {
            this.products = await this.cartService.getCart();
        } catch (error) {
            console.error('Erro ao carregar o carrinho:', error);
        }
    }

    protected decreaseQuantity(product: CartItem): void {
        if (product.quantity > 1) {
            product.quantity--;

            this.removeProduct(product.product._id);
        }
    }

    protected async increaseQuantity(product: CartItem): Promise<void> {
        await this.cartService.addToCart({ productId: product.product._id, quantity: 1 });
        this.listProductsCart();
    }

    protected async removeProduct(productId: string): Promise<void> {
        try {
            await this.cartService.removeFromCart(productId);
            this.listProductsCart();
        } catch (error) {
            console.error('Erro ao remover produto:', error);
        }
    }

    protected closeCart(): void {
        this.dialog.closeAll();
    }

    protected finishPurchase(): void {
        // TODO: Integrar a lógica alinhada com o endpoint
    }
}
