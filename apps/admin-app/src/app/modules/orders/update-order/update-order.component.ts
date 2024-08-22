import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { FormState, Order } from '@libs/models';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'la-project-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss'],
})
export class UpdateOrderComponent implements OnInit {
  formState: FormState<Order> = null;

  constructor(
    private readonly service: OrdersService,
    private readonly router: ActivatedRoute
  ) {}

  get orderId() {
    return this.router.snapshot.paramMap.get('orderId') as string;
  }

  ngOnInit(): void {
    this.service
      .getOrderById(this.orderId)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((order) => {
        this.formState = {
          data: order,
          pristine: true,
          touched: false,
        };
      });
  }

  updateOrder(data: Order) {
    this.service
      .updateOrder(this.orderId, data)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe((updatedOrder) => {
        this.formState = {
          data: updatedOrder,
          pristine: true,
          touched: false,
        };
      });
  }
}
