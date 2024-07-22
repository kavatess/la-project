import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment, PaymentProperties } from '@libs/models';
import { TableService } from 'libs/front-end/src/components/advanced-table/store/table.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService implements TableService {
  constructor(private readonly http: HttpClient) {}

  getData(): Observable<Payment[]> {
    return of([
      {
        id: '1234',
        [PaymentProperties.title]: 'Momo',
        [PaymentProperties.description]: 'Payment by Momo',
        [PaymentProperties.status]: 'Active',
      },
      {
        id: '12345',
        [PaymentProperties.title]: 'VNPay',
        [PaymentProperties.description]: 'Payment by VNPay',
        [PaymentProperties.status]: 'Active',
      },
    ] as Payment[]);
  }

  getPaymentById(paymentId: string): Observable<Payment> {
    return of({
      id: paymentId,
      [PaymentProperties.title]: 'Momo',
      [PaymentProperties.description]: 'Payment by Momo',
      [PaymentProperties.status]: 'Active',
    } as Payment);
  }
  createPayment(payment: Payment): Observable<Payment> {
    return of(payment);
  }

  updatePayment(
    paymentId: string,
    data: Partial<Payment>
  ): Observable<Payment> {
    return of(data as Payment);
  }
}
