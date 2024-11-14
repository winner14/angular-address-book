import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-title-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss'
})
export class TitleBarComponent {
  @Input() title: string = '';

  // @Input() searchControl: string = '';

  constructor(public dialog: MatDialog) { }

  searchControl = new FormControl();

  onAdd(): void {
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
      width: '350px',
      // data: contact,
      panelClass: 'custom-dialog-container',
      autoFocus: false,
    });
  }

  onSearch(): void {
    console.log(this.searchControl.value);
  }
}
