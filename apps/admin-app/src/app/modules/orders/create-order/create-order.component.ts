import { Component } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '@libs/models';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.routes';
import { OrdersRoutes } from '../orders.routes';

@Component({
  selector: 'la-project-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent {
  constructor(
    private readonly service: OrdersService,
    private readonly router: Router
  ) {}

  createOrder(data: Order) {
    this.service
      .createOrder(data)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((order) => {
        this.router.navigate([
          AppRoutes.Orders,
          OrdersRoutes.Update,
          order.id || null,
        ]);
      });
  }
}
