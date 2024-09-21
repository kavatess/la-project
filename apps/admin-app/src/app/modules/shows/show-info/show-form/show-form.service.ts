import { Injectable } from '@angular/core';
import { PaymentsService } from '../../../payments/payments.service';
import { map, Observable } from 'rxjs';
import { Option } from '@libs/models';

@Injectable({
  providedIn: 'root',
})
export class ShowFormService {
  constructor(private readonly paymentService: PaymentsService) {}
  getPaymentOptions(): Observable<Option[]> {
    return this.paymentService
      .getData()
      .pipe(
        map((data) =>
          data.map((item) => ({ value: item.id, title: item.title }))
        )
      );
  }
}
