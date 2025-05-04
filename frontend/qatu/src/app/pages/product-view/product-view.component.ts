// Libs
import { Component } from '@angular/core';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

// Interfaces
import { Product } from '../../core/services/product/product.interface';

@Component({
  selector: 'app-product-view',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
    // TODO: Apagar mock após integração
    protected product: Product = {
        id: 1,
        name: 'Fone De Ouvido Bluetooth Tws jbl i12',
        price: 25.99,
        category: 'Tecnologia',
        stock: 1,
        description: 'Características dos recursos • Funcionamento automático • Qualidade de som Super divertida • Exibição em seu telefone.A energia será exibida em seu telefone. Os números são apenas para referência. Isso não é necessário.',
        imageUrl: 'https://placehold.co/400x400/png',
    };
}
