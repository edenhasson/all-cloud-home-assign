import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Contact } from '../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-details-page',
  standalone: true,
  imports: [CommonModule, CommonButtonComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  contactService = inject(ContactsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  subscription!: Subscription;
  contact!: Contact;
  contactInfoForm!: FormGroup;
  isSubmitButtonDisabled = true;
  

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      this.contactService.getContact(id).subscribe(contact => {
        this.contact = contact
        this.contactInfoForm = this.fb.group({
          contactData: this.fb.group({
            firstName: [contact.firstName],
            lastName: [contact.lastName],
            email: [contact.email, [Validators.email]],
            cell: [contact.cell,[Validators.maxLength(15),Validators.minLength(10)]],
            picture: [contact.picture],
            city: [contact.city],
            phone: [contact.phone, [Validators.maxLength(15),Validators.minLength(10)]],
            age: [contact.age]
          })
        })  
        this.contactInfoForm.disable();
      }
      );
    });
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.contactInfoForm.valid) {
      const contact = {...this.contact,...this.contactInfoForm.get('contactData')?.value};
      this.contactService.updateContact(contact).subscribe(()=> {
        this.router.navigateByUrl('');
      });
    }
  }

  makeFormEditable(): void {
    this.contactInfoForm.enable();
    this.isSubmitButtonDisabled = false;
  }

  deleteContact(id: string): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }

  isNewContact(): boolean {
    const timeDifference = new Date().getTime() - +this.contact.creationDate;
    const tenMinInMilli = 10 * 60 * 1000;
    if (timeDifference >= tenMinInMilli) {
      return false;
    }
    return true;
  }
}
