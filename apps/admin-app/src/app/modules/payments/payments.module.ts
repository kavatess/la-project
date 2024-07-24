import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { paymentsRoutes } from './payments.routes';
import { PaymentsComponent } from './payments.component';
import { AdvancedTableModule } from '@libs/front-end';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    AdvancedTableModule,
    RouterModule.forChild(paymentsRoutes),
  ],
})
export class PaymentsModule {}
