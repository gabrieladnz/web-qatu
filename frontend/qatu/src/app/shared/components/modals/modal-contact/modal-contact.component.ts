import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-modal-contact',
    standalone: true,
    imports: [MatIconModule, CommonModule],
    templateUrl: './modal-contact.component.html',
    styleUrls: ['./modal-contact.component.scss'],
})
export class ModalContactComponent {
    constructor(
        private dialogRef: MatDialogRef<ModalContactComponent>,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            'instagram',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../assets/figures/instagram.svg'
            )
        );
    }

    closeModal(): void {
        this.dialogRef.close();
    }
}
