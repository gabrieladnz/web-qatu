import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-sale',
  imports: [NavbarComponent, FooterComponent, MatIconModule, RouterModule],
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.scss'
})
export class ProductSaleComponent {

}
