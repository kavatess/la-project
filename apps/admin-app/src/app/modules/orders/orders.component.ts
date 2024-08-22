import { Component, OnInit } from '@angular/core';
import { Order, OrderProperties, OrderStatuses } from '@libs/models';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { FilterTypes, TableColumn, TableService } from '@libs/front-end';
import { OrdersService } from './orders.service';
import { OrdersRoutes } from './orders.routes';

@Component({
  selector: 'la-project-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  readonly OrderProperties = OrderProperties;
  readonly OrderStatuses = OrderStatuses;

  readonly columns: TableColumn[] = [
    {
      field: OrderProperties.customer,
      title: 'Customer',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: OrderProperties.orderItems,
      title: 'Items',
      filter: {
        type: FilterTypes.String,
      },
      sorting: false,
    },
    {
      field: OrderProperties.total,
      title: 'Total',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: OrderProperties.status,
      title: 'Status',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: 'detailBtn',
      title: null,
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly tableService: TableService,
    private readonly orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.tableService.replaceService(this.orderService);
  }

  orderItemOnClick(order: Order): void {
    this.router.navigate([
      AppRoutes.Orders,
      OrdersRoutes.Update,
      order.id || null,
    ]);
  }

  createBtnOnClick(): void {
    this.router.navigate([AppRoutes.Orders, OrdersRoutes.Create]);
  }
}
