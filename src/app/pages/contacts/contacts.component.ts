import { Component, inject } from '@angular/core';
import { TitleBarComponent } from "../../components/title-bar/title-bar.component";
import { TableComponent } from "../../components/table/table.component";
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, isFormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddContactDialogComponent } from '../../components/add-contact-dialog/add-contact-dialog.component';
import { RefreshContactServiceService } from '../../services/refresh-contact-service.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    TitleBarComponent,
    TableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contacts: Contact[] = [];

  searchedContacts: Contact[] = [];

  isSearching: boolean = false;

  contactService = inject(ContactService);
  dialog = inject(MatDialog);
  contactRefreshService = inject(RefreshContactServiceService);

  ngOnInit(): void {
    this.getContacts();
    this.refresh();

    this.searchControl.valueChanges.subscribe(() => {
      this.searchContacts();
    })

    this.searchControl.valueChanges.subscribe(() => {
      this.searchContacts();
    })
  }

  public getContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data.data.sort((a: Contact, b: Contact) => { return a.name.localeCompare(b.name) });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }, complete: () => { }
    })
  }

  public searchContacts() {

    this.isSearching = this.searchControl.value!.length > 0;

    this.searchedContacts = this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchControl.value!.toLowerCase()));

    // console.log(event);


    this.refresh();
  }

  refresh() {
    this.contactRefreshService.refresh$.subscribe(() => {
      this.getContacts();
    });
  }

  // constructor(public dialog: MatDialog) { }

  searchControl = new FormControl('');

  onAdd(): void {
    this.dialog.open(AddContactDialogComponent, {
      width: '350px',
      data: this.contacts,
      // panelClass: 'custom-dialog-container',
      autoFocus: false,
    });
  }

  onSearch(): void {
    console.log(this.searchControl.value);
  }
}
