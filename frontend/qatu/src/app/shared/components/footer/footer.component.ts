import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ModalAboutQatuComponent } from '../../../shared/components/modals/modal-about-qatu/modal-about-qatu.component';
import { ModalHelpCenterComponent } from '../../../shared/components/modals/modal-help-center/modal-help-center.component';
import { ModalTermsOfUseComponent } from '../../../shared/components/modals/modal-terms-of-use/modal-terms-of-use.component';
import { ModalContactComponent } from '../../../shared/components/modals/modal-contact/modal-contact.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
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

  openHelpCenterModal(): void {
    this.dialog.open(ModalHelpCenterComponent, {
      width: '800px',
      maxWidth: '90vw',
      panelClass: 'help-center-modal-container',
      autoFocus: false
    });
  }

  openTermsOfUseModal(): void {
    this.dialog.open(ModalTermsOfUseComponent, {
      width: '800px',
      maxWidth: '90vw',
      panelClass: 'terms-modal-container',
      autoFocus: false
    });
  }

  openContactModal(): void {
    this.dialog.open(ModalContactComponent, {
      width: '800px',
      maxWidth: '90vw',
      panelClass: 'contact-modal-container',
      autoFocus: false
    });
  }
}