import { Route } from '@angular/router';
import { OrdersComponent } from './orders.component';

export enum OrdersRoutes {
  Create = 'create',
  Update = 'update',
}

export const ordersRoutes: Route[] = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: OrdersRoutes.Create,
    loadChildren: () =>
      import('./create-order/create-order.module').then(
        (m) => m.CreateOrderModule
      ),
  },
  {
    path: `${OrdersRoutes.Update}/:orderId`,
    loadChildren: () =>
      import('./update-order/update-order.module').then(
        (m) => m.UpdateOrderModule
      ),
  },
];
