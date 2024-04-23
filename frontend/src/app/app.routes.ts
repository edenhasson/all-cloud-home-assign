import { Routes } from '@angular/router';
import { ContactHomeComponent } from './components/contact-home/contact-home.component';
import { ContactDetailsPageComponent } from './components/contact-details-page/contact-details-page.component';
import { AddContactPageComponent } from './components/add-contact-page/add-contact-page.component';

export const routes: Routes = [
    {path:'', component: ContactHomeComponent},
    {path:'details/:id',component: ContactDetailsPageComponent},
    {path:'newContactForm', component: AddContactPageComponent}
];
