import { Component, inject } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-actions-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './contacts-actions-toolbar.component.html',
  styleUrl: './contacts-actions-toolbar.component.scss'
})
export class ContactsActionsToolbarComponent {

  contactService = inject(ContactsService);
  router = inject(Router);

  generateContacts(){
    this.contactService.generateContactsEvent.next();
  }
  
  redirectContactForm() {
    this.router.navigateByUrl('newContactForm');
  }

  backToContactsPage(){
    this.router.navigateByUrl('');
  }
}
