import { Injectable } from '@angular/core';
import { Contact, ContactResponse } from '../interfaces/contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url: string = 'http://well-lobster-boss.ngrok-free.app';
  // url: string = 'http://95b1-102-176-101-7.ngrok-free.app';

  constructor(private http: HttpClient) { }

  async getContact(id: number): Promise<Contact | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  // async getContacts(): Promise<Contact[] | []> {
  //   const data = await fetch(this.url + '/address-books', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   return await data.json() ?? [];
  // }

  public getContacts(): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.url}/address-books`);
  }

  public getContactByNames(name: string): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.url}/address-books?name=${name}`);
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.url}/address-books`, contact);
  }

  public deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/address-book/${id}`);
  }

  // public updateContact(id: number): Observable<Contact> {
  //   return this.http.put<Contact>(`${this.url}/address-book/${id}`, {});
  // }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.url}/address-book/${contact.id}`, contact);
  }

  // async addContact(contact: Contact): Promise<Contact> {
  //   const data = await fetch(this.url, {
  //     method: 'POST',
  //     body: JSON.stringify(contact),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   return await data.json();
  // }

  // add cont
}
