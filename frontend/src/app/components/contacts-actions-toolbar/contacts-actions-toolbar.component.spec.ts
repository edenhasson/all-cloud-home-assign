import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsActionsToolbarComponent } from './contacts-actions-toolbar.component';

describe('ContactsActionsToolbarComponent', () => {
  let component: ContactsActionsToolbarComponent;
  let fixture: ComponentFixture<ContactsActionsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsActionsToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsActionsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
