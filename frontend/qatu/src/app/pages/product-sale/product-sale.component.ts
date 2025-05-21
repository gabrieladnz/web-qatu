// Libs
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

// Components
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ModalBecomeASellerComponent } from '../../shared/components/modals/modal-become-a-seller/modal-become-a-seller.component';

// Services
import { AuthService } from '../../core/services/auth/auth.service';
import { TokenService } from '../../core/services/token/token.service';

@Component({
    selector: 'app-product-sale',
    imports: [NavbarComponent, FooterComponent, MatIconModule, RouterModule],
    templateUrl: './product-sale.component.html',
    styleUrl: './product-sale.component.scss'
})
export class ProductSaleComponent implements OnInit {
    protected userSeller: boolean = false;
    protected isAuthenticated: boolean = false;

    constructor(private authService: AuthService, private tokenService: TokenService, private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.checkAuthStatus();
        this.checkUserSeller();
    }

    private checkAuthStatus(): void {
        this.isAuthenticated = this.tokenService.isAuthenticated();
    }

    private async checkUserSeller(): Promise<void> {
        try {
            const userId = this.tokenService.getUserId();
            if (userId) {
                const userInfo = await this.authService.getUserById(userId);
                this.userSeller = userInfo.isSeller;
            }

        } catch (error) {
            console.error('Erro ao obter a informação do usuário:', error);
        }
    }

    protected openBecomeSellerModal(): void {
        const dialogRef = this.dialog.open(ModalBecomeASellerComponent, {
            width: '500px',
            disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.checkUserSeller();
            }
        });
    }
}
