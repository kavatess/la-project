/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSelectModule } from '@libs/front-end';
import { PaymentsService } from '../../modules/payments/payments.service';
import { Payment } from '@libs/models';

@Component({
  selector: 'la-project-payment-search-select',
  standalone: true,
  imports: [CommonModule, SearchSelectModule],
  templateUrl: './payment-search-select.component.html',
  styleUrls: ['./payment-search-select.component.scss'],
  providers: [PaymentsService],
})
export class PaymentSearchSelectComponent {
  @Input()
  multiple = false;

  constructor(private readonly paymentService: PaymentsService) {}

  findPayments = (ids: string[]) => this.paymentService.getData();

  searchPaymentByTxt = (txt: string) => this.paymentService.getData();

  displayPayment = (payment: Payment) => payment?.title;
}
