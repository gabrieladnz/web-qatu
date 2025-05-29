// Libs
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

// Interfaces
import { Product } from '../../core/services/product/product.interface';

// Services
import { ProductService } from '../../core/services/product/product.service';
import { CartService } from '../../core/services/cart/cart.service';
import { TokenService } from '../../core/services/token/token.service';

@Component({
    selector: 'app-product-view',
    imports: [NavbarComponent, FooterComponent, CommonModule],
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit {
    protected product!: Product;
    protected snackBar = inject(MatSnackBar);
    protected isAuthenticated: boolean = false;

    constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private tokenService: TokenService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) this.getProductById(id);
        });

        this.checkAuthStatus();
    }

    protected async getProductById(productId: string): Promise<void> {
        try {
            this.product = (await this.productService.getProductById(productId));
        } catch (error) {
            console.error('Error ao buscar por produto:', error);
        }
    }

    protected async addToCart(itemProduct: Product): Promise<void> {
        try {
            await this.cartService.addToCart({
                productId: itemProduct._id,
                seller: itemProduct.seller,
                quantity: 1,
            })

            this.snackBar.open('Produto adicionado ao carrinho.', 'Fechar', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });
        } catch (error) {
            this.snackBar.open('Erro ao adicionar produto ao carrinho.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
        }
    }

    protected getLastRatingScore(): number {
        if (!this.product.ratings || this.product.ratings.length === 0) {
            return 0;
        }

        const lastRating = this.product.ratings[this.product.ratings.length - 1];
        return lastRating.score;
    }

    protected getReviewText(): string {
        const count = this.product.ratings?.length || 0;
        if (count === 0) {
            return 'avaliações';
        } else if (count === 1) {
            return 'avaliação';
        } else {
            return 'avaliações';
        }
    }

    private checkAuthStatus(): void {
        this.isAuthenticated = this.tokenService.isAuthenticated();
    }
}
