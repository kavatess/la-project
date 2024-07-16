import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentFormComponent } from './payment-form.component';

@NgModule({
  declarations: [PaymentFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [PaymentFormComponent],
})
export class PaymentFormModule {}
