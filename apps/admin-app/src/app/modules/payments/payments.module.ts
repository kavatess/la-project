import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { paymentsRoutes } from './payments.routes';
import { PaymentsComponent } from './payments.component';
import { AdvancedTableModule } from '@libs/front-end';
import { TableService } from 'libs/front-end/src/components/advanced-table/store/table.service';
import { PaymentsService } from './payments.service';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    AdvancedTableModule,
    RouterModule.forChild(paymentsRoutes),
  ],
  providers: [
    {
      provide: TableService,
      useClass: PaymentsService,
    },
  ],
})
export class PaymentsModule {}
