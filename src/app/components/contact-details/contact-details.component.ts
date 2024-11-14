import { Component, inject, Inject, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { FormControl } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactsComponent } from '../../pages/contacts/contacts.component';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
import { CommonModule } from '@angular/common';
import { RefreshContactServiceService } from '../../services/refresh-contact-service.service';
import { LoadingComponent } from "../loading/loading.component";
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  contactService = inject(ContactService);

  constructor(
    public dialogRef: MatDialogRef<ContactDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact,
    // private contactsComponent: ContactsComponent,
    private contactRefreshService: RefreshContactServiceService,

    public dialog: MatDialog,
  ) { }

  onCloseTap(): void {
    this.dialogRef.close();
  }


  public getContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        console.log(data);

        // this.contacts = data.data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }, complete: () => { }
    })
  }

  onEditTap(contact: Contact): void {
    // this.dialogRef.close(this.contact);
    this.dialog.open(EditContactDialogComponent, {
      width: '300px',
      data: contact,
    })
  }

  onDeleteTap(contact: Contact): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '300px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
    });
  }
}
