// Libs
import { Component } from '@angular/core';

// Services
import { ProductService } from '../../../../core/services/product/product.service';

@Component({
  selector: 'app-modal-advertise-product',
  imports: [],
  templateUrl: './modal-advertise-product.component.html',
  styleUrl: './modal-advertise-product.component.scss'
})
export class ModalAdvertiseProductComponent {
    constructor(private productService: ProductService) { }

    protected createAdvertise(): void {
        
    }
}
