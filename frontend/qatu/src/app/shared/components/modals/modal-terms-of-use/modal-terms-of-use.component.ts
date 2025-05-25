import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-terms-of-use',
    imports: [MatIconModule],
    templateUrl: './modal-terms-of-use.component.html',
    styleUrls: ['./modal-terms-of-use.component.scss'],
})
export class ModalTermsOfUseComponent {
    constructor(private dialogRef: MatDialogRef<ModalTermsOfUseComponent>) {}

    closeModal(): void {
        this.dialogRef.close();
    }
}
