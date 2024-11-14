import { Component, EventEmitter, inject, Inject, Input, Output, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogModule,
    MatCheckbox,
    // MAT_DIALOG_DATA,
    FormsModule,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './add-contact-dialog.component.html',
  styleUrl: './add-contact-dialog.component.scss'
})
export class AddContactDialogComponent {
  contactService = inject(ContactService);
  snackBar = inject(MatSnackBar);

  constructor(
    public dialogRef: MatDialogRef<AddContactDialogComponent>,
    // public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public contacts: Contact[],
  ) { }
  formGroup = new FormGroup({
    nameControl: new FormControl('', { validators: [Validators.required] }),
    emailControl: new FormControl('', { validators: [Validators.email] }),
    phoneNoControl: new FormControl('', { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(12)] }),
    addressControl: new FormControl(''),
  })

  onCloseTap(): void {
    this.dialogRef.close();
  }

  newContact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
  }

  hasContact(): boolean {
    if (this.contacts.find(contact => contact.name === this.newContact.name) || this.contacts.find(contact => contact.email === this.newContact.email) || this.contacts.find(contact => contact.phone === this.newContact.phone)) {
      return true;
    } else {
      return false;
    }
  }

  isLoading: boolean = false;

  onSaveTap(): void {
    this.newContact = {
      name: this.formGroup.value.nameControl!,
      email: this.formGroup.value.emailControl!,
      phone: this.formGroup.value.phoneNoControl!,
      address: this.formGroup.value.addressControl!,
    }

    console.log(this.formGroup.value);

    if (this.formGroup.valid) {
      this.isLoading = true;

      this.contactService.addContact(this.newContact).subscribe({
        next: (data) => {
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error) => {
          console.error('There was an error!', error);
        }, complete: () => { }
      })

      this.isLoading = false;
      this.snackBar.open('Contact added successfully!', 'Close', {
        verticalPosition: 'top',
        politeness: 'assertive',
        duration: 2000,
      });
    } else {
      this.snackBar.open('Please fill out all fields correctly!', 'Close', {
        verticalPosition: 'top',
        politeness: 'assertive',
        duration: 2000,
      });
    }
  }

  onClearTap(): void {
    this.formGroup.reset();
  }

}
