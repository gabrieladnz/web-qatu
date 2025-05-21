// Libs
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

// Services
import { ClientService } from '../../../../core/services/client/client.service';
import { TokenService } from '../../../../core/services/token/token.service';

@Component({
    selector: 'app-modal-become-a-seller',
    imports: [CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule],
    templateUrl: './modal-become-a-seller.component.html',
    styleUrl: './modal-become-a-seller.component.scss',
})
export class ModalBecomeASellerComponent {
    protected loading: boolean = false;

    constructor(
        private clientService: ClientService,
        private tokenService: TokenService,
        private dialogRef: MatDialogRef<ModalBecomeASellerComponent>,
    ) { }

    protected async confirmBecomeSeller(): Promise<void> {
        try {
            const userId = this.tokenService.getUserId();

            if (userId) {
                await this.clientService.becomeSeller(userId);
                this.dialogRef.close(true);
            }
        } catch (error) {
            console.error('Error becoming a seller:', error);
            this.dialogRef.close(false);
        }
    }

    protected closeModal(): void {
        this.dialogRef.close(false);
    }
}
