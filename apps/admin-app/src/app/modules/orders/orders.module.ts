import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ordersRoutes } from './orders.routes';
import { OrdersComponent } from './orders.component';
import { AdvancedTableModule } from '@libs/front-end';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    AdvancedTableModule,
    RouterModule.forChild(ordersRoutes),
  ],
})
export class OrdersModule {}
