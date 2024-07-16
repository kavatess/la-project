import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { paymentsRoutes } from './payments.routes';
import { PaymentsComponent } from './payments.component';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, RouterModule.forChild(paymentsRoutes)],
})
export class PaymentsModule {}
