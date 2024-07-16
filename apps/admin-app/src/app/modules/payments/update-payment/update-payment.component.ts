import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { FormState, Payment } from '@libs/models';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'la-project-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.scss'],
})
export class UpdatePaymentComponent implements OnInit {
  formState: FormState<Payment> = null;

  @ViewChild(PaymentFormComponent)
  paymentFormComp: PaymentFormComponent;

  constructor(
    private readonly service: PaymentsService,
    private readonly router: ActivatedRoute
  ) {}

  get paymentId() {
    return this.router.snapshot.paramMap.get('paymentId');
  }

  ngOnInit(): void {
    this.service
      .getPaymentById(this.paymentId)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((payment) => {
        this.formState = {
          data: payment,
          pristine: true,
          touched: false,
        };
      });
  }

  updatePayment() {
    if (this.paymentFormComp.form.invalid) return;
    this.service
      .updatePayment(this.paymentId, this.paymentFormComp.form.value)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((updatedPayment) => {
        this.formState = {
          data: updatedPayment,
          pristine: true,
          touched: false,
        };
      });
  }
}
