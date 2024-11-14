import { Component, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactDetailsComponent } from "../contact-details/contact-details.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() contacts: Contact[] = [];

  constructor(public dialog: MatDialog) { }

  onDetailsTap(contact: Contact) {
    this.dialog.open(ContactDetailsComponent, {
      width: '300px',
      data: contact,
      // panelClass: 'custom-dialog-container',
      autoFocus: false,
    });

  }
}
