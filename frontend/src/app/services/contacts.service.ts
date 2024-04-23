import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, Subject, of } from 'rxjs';
import { Contact } from '../interfaces/contact.interface';
import { HttpClient } from '@angular/common/http';
import { OnlineService } from './online.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  generateContactsEvent = new Subject<void>();
  httpClient = inject(HttpClient);
  onlineService = inject(OnlineService);

  getContact(id: string): Observable<Contact> {
  return this.httpClient.get<Contact>(`http://localhost:4000/contact/${id}`);
  }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>('http://localhost:4000/contacts');
  }


  generateContacts(): Observable<Object> {
    return this.onlineService.sendRequest('http://localhost:4000/contacts/random','post', {});
  }

  addContact(contact: Contact): Observable<Object> {
    return this.onlineService.sendRequest('http://localhost:4000/contact','post', contact);
  }

  deleteContact(id: string): Observable<Object> {
    return this.onlineService.sendRequest(`http://localhost:4000/contact/${id}`,'delete');
  }

  updateContact(contact: Contact): Observable<Object> {
    return this.onlineService.sendRequest(`http://localhost:4000/contact/`, 'put' ,contact);
  }

}
