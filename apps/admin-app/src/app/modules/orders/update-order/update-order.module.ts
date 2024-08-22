import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateOrderComponent } from './update-order.component';
import { OrderFormModule } from '../order-form/order-form.module';
import { Route, RouterModule } from '@angular/router';

export const updateOrderRoutes: Route[] = [
  {
    path: '',
    component: UpdateOrderComponent,
  },
];

@NgModule({
  declarations: [UpdateOrderComponent],
  imports: [
    CommonModule,
    OrderFormModule,
    RouterModule.forChild(updateOrderRoutes),
  ],
  exports: [UpdateOrderComponent],
})
export class UpdateOrderModule {}
