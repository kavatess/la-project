import { Component, OnInit } from '@angular/core';
import { PaymentsService } from './payments.service';
import { catchError, of } from 'rxjs';
import { Payment, PaymentStatuses } from '@libs/models';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { PaymentsRoutes } from './payments.constants';

@Component({
  selector: 'la-project-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  readonly PaymentStatuses = PaymentStatuses;

  paymentList: Payment[] = [];

  constructor(
    private readonly service: PaymentsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.service
      .getPayments()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        })
      )
      .subscribe((payments) => {
        this.paymentList = payments;
      });
  }

  paymentItemOnClick(payment: Payment): void {
    this.router.navigate([
      AppRoutes.Payments,
      PaymentsRoutes.Update,
      payment.id || null,
    ]);
  }

  createBtnOnClick(): void {
    this.router.navigate([AppRoutes.Payments, PaymentsRoutes.Create]);
  }
}
