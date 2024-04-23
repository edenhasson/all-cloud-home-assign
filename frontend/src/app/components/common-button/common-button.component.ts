import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {

  router = inject(Router);

  @Input({required: true}) label!: string;
  @Input() directTo!: string;
  @Input() isDisabled: boolean = false;
  @Output() onSumbit: EventEmitter<void> = new EventEmitter();

  doAction(){
    if(this.directTo?.length > 0) {
      this.router.navigate([this.directTo]);
    } else {
      this.onSumbit.emit();
    }
  }
}
