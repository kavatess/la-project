import { NgModule } from '@angular/core';
import { CreateOrderComponent } from './create-order.component';
import { CommonModule } from '@angular/common';
import { OrderFormModule } from '../order-form/order-form.module';
import { Route, RouterModule } from '@angular/router';

export const createOrderRoutes: Route[] = [
  {
    path: '',
    component: CreateOrderComponent,
  },
];

@NgModule({
  declarations: [CreateOrderComponent],
  imports: [
    CommonModule,
    OrderFormModule,
    RouterModule.forChild(createOrderRoutes),
  ],
  exports: [CreateOrderComponent],
})
export class CreateOrderModule {}
