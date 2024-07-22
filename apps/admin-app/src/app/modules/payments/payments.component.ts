import { Component } from '@angular/core';
import { Payment, PaymentProperties, PaymentStatuses } from '@libs/models';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { PaymentsRoutes } from './payments.constants';
import {
  FilterTypes,
  TableColumn,
} from 'libs/front-end/src/components/advanced-table/advanced-table.model';

@Component({
  selector: 'la-project-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
  readonly PaymentProperties = PaymentProperties;
  readonly PaymentStatuses = PaymentStatuses;

  columns: TableColumn[] = [
    {
      field: PaymentProperties.title,
      title: 'Title',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: PaymentProperties.description,
      title: 'Description',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: PaymentProperties.status,
      title: 'Tình trạng',
      filter: {
        type: FilterTypes.Array,
        options: [
          {
            value: PaymentStatuses.Active,
            title: PaymentStatuses.Active,
          },
          {
            value: PaymentStatuses.Inactive,
            title: PaymentStatuses.Inactive,
          },
        ],
      },
      sorting: true,
    },
  ];

  constructor(private readonly router: Router) {}

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
