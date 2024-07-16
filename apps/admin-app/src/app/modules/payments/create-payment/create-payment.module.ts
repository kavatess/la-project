import { NgModule } from '@angular/core';
import { CreatePaymentComponent } from './create-payment.component';
import { CommonModule } from '@angular/common';
import { PaymentFormModule } from '../payment-form/payment-form.module';
import { Route, RouterModule } from '@angular/router';

export const createPaymentRoutes: Route[] = [
  {
    path: '',
    component: CreatePaymentComponent,
  },
];

@NgModule({
  declarations: [CreatePaymentComponent],
  imports: [
    CommonModule,
    PaymentFormModule,
    RouterModule.forChild(createPaymentRoutes),
  ],
  exports: [CreatePaymentComponent],
})
export class CreatePaymentModule {}
