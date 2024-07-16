import { Component, ViewChild } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { Payment } from '@libs/models';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.routes';
import { PaymentsRoutes } from '../payments.constants';

@Component({
  selector: 'la-project-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
})
export class CreatePaymentComponent {
  @ViewChild(PaymentFormComponent)
  paymentFormComp: PaymentFormComponent;

  constructor(
    private readonly service: PaymentsService,
    private readonly router: Router
  ) {}

  createPayment() {
    this.service
      .createPayment(this.paymentFormComp.form.value as Payment)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((payment) => {
        this.router.navigate([
          AppRoutes.Payments,
          PaymentsRoutes.Update,
          payment.id || null,
        ]);
      });
  }
}
