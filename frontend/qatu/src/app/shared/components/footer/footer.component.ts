import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule  } from '@angular/material/dialog';
import { ModalAboutQatuComponent } from '../../../shared/components/modals/modal-about-qatu/modal-about-qatu.component';
@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  openAboutModal(): void {
    this.dialog.open(ModalAboutQatuComponent, {
      width: '800px',
      maxWidth: '90vw',
      panelClass: 'about-modal-container',
      autoFocus: false
    });
  }
}
