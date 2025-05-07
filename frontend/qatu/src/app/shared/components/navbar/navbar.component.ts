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

    constructor(private router: Router) { }

    protected search(): void {
        // TODO: A lógica aqui vai ser parecida com a da função searchToCategory().
        // Vamos usar o router para navegar pra a página de busca e passar o valor do input como parâmetro de busca.
        // A consulta pra puxar os produtos do ProductService vai ser feita lá também, na função fetchProducts()

        // const productList = await this.productService.getProducts({
        //     title: this.searchValue,
        // });
        // this.products.emit(productList);
    }

    protected searchToCategory(category: string): void {
        this.router.navigate(['/search'], {
            queryParams: { category }
        });
    }
}
