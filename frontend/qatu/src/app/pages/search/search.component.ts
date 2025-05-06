import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../core/services/product/product.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-search',
    imports: [
        NavbarComponent,
        FooterComponent,
        CardProductComponent,
        AsyncPipe,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
})
export class SearchComponent {
    protected arraySubject = new BehaviorSubject<Product[]>([]);
    listProducts = this.arraySubject.asObservable();

    updateArray(array: Product[]) {
        this.arraySubject.next(array);
    }
}
