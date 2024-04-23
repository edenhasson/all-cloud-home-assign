import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { CommonButtonComponent } from '../common-button/common-button.component';

@Component({
  selector: 'app-add-contact-page',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonButtonComponent],
  templateUrl: './add-contact-page.component.html',
  styleUrl: './add-contact-page.component.scss'
})
export class AddContactPageComponent implements OnInit{
  fb = inject(FormBuilder);
  router = inject(Router);
  contactService = inject(ContactsService);
  addContactForm!: FormGroup;

  ngOnInit(): void {
    this.addContactForm = this.fb.group({
      contactData: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        cell: ['', [Validators.required, Validators.maxLength(15),Validators.minLength(10)]],
        picture: ['', [Validators.required]],
        city: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.maxLength(15),Validators.minLength(10)]],
        age: ['', [Validators.required]]
      })
    })  
  }

   onSubmit() {
    if (this.addContactForm.valid) {
      const contact = this.addContactForm.get('contactData')?.value;
      this.contactService.addContact(contact).subscribe(()=> {
        this.router.navigateByUrl('');
      });
    }
  }

}
