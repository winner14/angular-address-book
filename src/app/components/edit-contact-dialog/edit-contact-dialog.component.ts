import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Contact } from '../../interfaces/contact';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-contact-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CommonModule,
    // BrowserModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-contact-dialog.component.html',
  styleUrl: './edit-contact-dialog.component.scss'
})
export class EditContactDialogComponent {
  contactService = inject(ContactService);
  snackBar = inject(MatSnackBar);


  constructor(
    public dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) {
    this.formGroup = new FormGroup({
      nameControl: new FormControl(this.contact.name, { validators: [Validators.required] }),
      emailControl: new FormControl(this.contact.email),
      phoneNoControl: new FormControl(this.contact.phone, { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(12)] }),
      // favoriteControl: new FormControl(false)
      addressControl: new FormControl(this.contact.address),
    });
  }

  formGroup: FormGroup;

  onCloseTap() {
    this.dialogRef.close();
    // console.log('nameControl: ' + this.formGroup.value.nameControl, 'emailControl: ' + this.formGroup.value.emailControl, 'phoneNoControl: ' + this.formGroup.value.phoneNoControl);
    // console.log(this.contact);


  }

  onCancelTap() {
    this.dialogRef.close();
  }

  newContact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
  }

  onUpdateTap() {
    this.newContact = {
      id: this.contact.id,
      name: this.formGroup.value.nameControl!,
      email: this.formGroup.value.emailControl!,
      phone: this.formGroup.value.phoneNoControl!,
      address: this.formGroup.value.addressControl!,
    }

    if (this.formGroup.valid) {
      this.contactService.updateContact(this.newContact!).subscribe({
        next: (data) => {
          console.log(data);
          // window.location.reload();
        },
        error: (error) => {
          console.error('There was an error!', error);
        }, complete: () => { }
      })
    } else {
      this.snackBar.open('Please fill out all fields correctly', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
      });
    }
  }
}
