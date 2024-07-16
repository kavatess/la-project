import { Route } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutes } from './payments.constants';

export const paymentsRoutes: Route[] = [
  {
    path: '',
    component: PaymentsComponent,
  },
  {
    path: PaymentsRoutes.Create,
    loadChildren: () =>
      import('./create-payment/create-payment.module').then(
        (m) => m.CreatePaymentModule
      ),
  },
  {
    path: `${PaymentsRoutes.Update}/:paymentId`,
    loadChildren: () =>
      import('./update-payment/update-payment.module').then(
        (m) => m.UpdatePaymentModule
      ),
  },
];
