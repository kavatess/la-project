import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePaymentComponent } from './update-payment.component';
import { PaymentFormModule } from '../payment-form/payment-form.module';
import { Route, RouterModule } from '@angular/router';

export const updatePaymentRoutes: Route[] = [
  {
    path: '',
    component: UpdatePaymentComponent,
  },
];

@NgModule({
  declarations: [UpdatePaymentComponent],
  imports: [
    CommonModule,
    PaymentFormModule,
    RouterModule.forChild(updatePaymentRoutes),
  ],
  exports: [UpdatePaymentComponent],
})
export class UpdatePaymentModule {}
