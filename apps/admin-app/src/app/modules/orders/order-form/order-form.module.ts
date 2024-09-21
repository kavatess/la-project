import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form.component';
import { UserSearchSelectComponent } from '../../../shared/user-search-select/user-search-select.component';
import { UsersService } from '../../users/users.service';
import { ShowSearchSelectComponent } from '../../../shared/show-search-select/show-search-select.component';
import { PaymentSearchSelectComponent } from '../../../shared/payment-search-select/payment-search-select.component';

@NgModule({
  declarations: [OrderFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserSearchSelectComponent,
    ShowSearchSelectComponent,
    PaymentSearchSelectComponent,
  ],
  exports: [OrderFormComponent],
  providers: [UsersService],
})
export class OrderFormModule {}
