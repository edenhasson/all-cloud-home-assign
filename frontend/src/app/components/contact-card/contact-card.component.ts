import { Component, Input, inject } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

  router = inject(Router)
  @Input({required: true}) contact!: Contact;

  routeToDetailsPage() {
    this.router.navigateByUrl(`details/${this.contact.id}`);
  }
}
