// Libs
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-client-area',
  imports: [NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './client-area.component.html',
  styleUrl: './client-area.component.scss'
})
export class ClientAreaComponent {

}
