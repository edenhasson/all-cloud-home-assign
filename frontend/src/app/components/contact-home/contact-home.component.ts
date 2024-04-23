import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact.interface';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Observable, Subscription} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContactsActionsToolbarComponent } from '../contacts-actions-toolbar/contacts-actions-toolbar.component';

@Component({
  selector: 'app-contact-home',
  standalone: true,
  imports: [
    CommonModule,
    ContactCardComponent,
    ContactsActionsToolbarComponent
  ],
  templateUrl: './contact-home.component.html',
  styleUrl: './contact-home.component.scss'
})
export class ContactHomeComponent implements OnInit, OnDestroy {
  contactsService = inject(ContactsService);
  contacts$!: Observable<Contact[]>;
  subscription!: Subscription;
  ngOnInit(): void {
    this.contacts$ = this.contactsService.getContacts();
    this.subscription = this.contactsService.generateContactsEvent.subscribe(()=> {
      this.contactsService.generateContacts().subscribe(() => {
        this.contacts$ = this.contactsService.getContacts();
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackContact(index: number, contact: Contact) {
    return contact.id;
  }
  
  

 
  
}
