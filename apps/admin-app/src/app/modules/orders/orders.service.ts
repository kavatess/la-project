import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableParentService } from '@libs/front-end';
import {
  Order,
  OrderItemProperties,
  OrderItemTypes,
  OrderProperties,
  OrderStatuses,
  PaymentProperties,
  PaymentStatuses,
  UserProperties,
} from '@libs/models';
import { debounceTime, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService implements TableParentService<Order> {
  constructor(private readonly http: HttpClient) {}

  getData(): Observable<Order[]> {
    return of([
      {
        id: '1',
        [OrderProperties.showId]: '1',
        [OrderProperties.show]: '1',
        [OrderProperties.customerId]: '1',
        [OrderProperties.customer]: {
          [UserProperties.firstName]: 'Nguyễn',
          [UserProperties.lastName]: 'Văn Anh',
          [UserProperties.phone]: '0123456789',
          [UserProperties.email]: 'X5wL4@example.com',
        },
        [OrderProperties.orderItems]: [
          {
            [OrderItemProperties.type]: OrderItemTypes.Seat,
            [OrderItemProperties.imgUrl]:'https://media.istockphoto.com/id/174616530/photo/two-numbered-orange-admission-tickets.jpg?s=2048x2048&w=is&k=20&c=Akm_tgrZYoCwEZJsWQOkJLHv_Z_SAGYUWWWM2hTqKbM=',
            [OrderItemProperties.title]: 'Summer Event Show Ticket (Standard)',
            [OrderItemProperties.quantity]: 2,
            [OrderItemProperties.price]: 300000,
            [OrderItemProperties.total]: 600000,
          },
          {
            [OrderItemProperties.type]: OrderItemTypes.Seat,
            [OrderItemProperties.imgUrl]:'https://media.istockphoto.com/id/174616530/photo/two-numbered-orange-admission-tickets.jpg?s=2048x2048&w=is&k=20&c=Akm_tgrZYoCwEZJsWQOkJLHv_Z_SAGYUWWWM2hTqKbM=',
            [OrderItemProperties.title]: 'Summer Event Show Ticket (VIP)',
            [OrderItemProperties.quantity]: 1,
            [OrderItemProperties.price]: 500000,
            [OrderItemProperties.total]: 500000,
          }
        ],
        [OrderProperties.total]: 1100000,
        [OrderProperties.paymentId]: '1',
        [OrderProperties.payment]: {
          [PaymentProperties.title]: 'Momo',
          [PaymentProperties.description]: 'Payment by Momo',
          [PaymentProperties.status]: PaymentStatuses.Active,
        },
        [OrderProperties.status]: OrderStatuses.Confirming,
      } as any as Order,
    ]).pipe(debounceTime(2000));
  }

  getOrderById(orderId: string): Observable<Order> {
    return of({} as Order);
  }

  createOrder(order: Order): Observable<Order> {
    return of(order);
  }

  updateOrder(orderId: string, data: Partial<Order>): Observable<Order> {
    return of(data as Order);
  }
}
