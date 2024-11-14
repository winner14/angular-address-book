import { Component, Inject, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshContactServiceService } from '../../services/refresh-contact-service.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  contactService = inject(ContactService);
  snackBar = inject(MatSnackBar);
  contactRefreshService = inject(RefreshContactServiceService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public contact: Contact,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
  ) { }

  onCanceledTap(): void {
    this.dialogRef.close();
  }

  isLoading: boolean = false;

  onDeletedTap(): void {
    this.isLoading = true;

    this.contactService.deleteContact(this.contact.id!).subscribe({
      next: (data) => {

        this.dialogRef.close();
        this.contactRefreshService.refresh();

        this.snackBar.open('Contact deleted!', 'Close', {
          duration: 2000,
        });

      },
      error: (error) => {
        console.error('There was an error!', error);
        this.snackBar.open('There was an error!', 'Close', {
          duration: 2000,
        });
      }, complete: () => { }
    })

    this.isLoading = false;
  }

}
