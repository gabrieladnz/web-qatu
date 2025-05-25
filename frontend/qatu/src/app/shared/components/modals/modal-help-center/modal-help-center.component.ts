import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-help-center',
    imports: [MatIconModule],
    templateUrl: './modal-help-center.component.html',
    styleUrls: ['./modal-help-center.component.scss'],
})
export class ModalHelpCenterComponent {
    constructor(private dialogRef: MatDialogRef<ModalHelpCenterComponent>) {}

    closeModal(): void {
        this.dialogRef.close();
    }
}
