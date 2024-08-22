import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form.component';

@NgModule({
  declarations: [OrderFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [OrderFormComponent],
})
export class OrderFormModule {}
