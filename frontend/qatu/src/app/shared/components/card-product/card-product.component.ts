import { Component, Input } from '@angular/core';

// Interfaces
import { Product } from '../../../core/services/product/product.interface';

@Component({
    selector: 'app-card-product',
    imports: [],
    templateUrl: './card-product.component.html',
    styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
    // TODO: Objeto mocado com produto de exemplo. Após integração utilizar só o @Input() com a lista passada pelo componente que chama
    @Input() product: Product[] = [];
}
