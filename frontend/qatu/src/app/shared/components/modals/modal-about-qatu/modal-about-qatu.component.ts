// Libs
import { trigger, transition, style } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { animate } from '@angular/animations';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-about-qatu',
    imports: [MatIconModule],
    templateUrl: './modal-about-qatu.component.html',
    styleUrl: './modal-about-qatu.component.scss',
    animations: [
        trigger('fadeInUp', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate(
                    '0.3s ease-out',
                    style({ opacity: 1, transform: 'translateY(0)' }),
                ),
            ]),
            transition(':leave', [
                animate(
                    '0.2s ease-in',
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                ),
            ]),
        ]),
    ],
})
export class ModalAboutQatuComponent {
    @Output() close = new EventEmitter<void>();

    constructor(
        private dialogRef: MatDialogRef<ModalAboutQatuComponent>,
    ) { }

    protected closeModal(): void {
        setTimeout(() => {
            this.dialogRef.close();
        }, 200);
    }
}
