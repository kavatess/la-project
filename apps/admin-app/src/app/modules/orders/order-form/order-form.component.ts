import { Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '@libs/front-end';
import { Order, OrderProperties, OrderStatuses } from '@libs/models';

@Component({
  selector: 'la-project-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent
  extends AbstractFormComponent<Order>
  implements OnChanges
{
  readonly OrderProperties = OrderProperties;
  readonly OrderStatuses = OrderStatuses;

  @Output()
  submitForm = new EventEmitter<Order>();

  readonly form = this.fb.group({
    [OrderProperties.showId]: [null, []],
    [OrderProperties.orderItems]: [null, []],
    [OrderProperties.total]: [null, []],
    [OrderProperties.paymentId]: [null, []],
    [OrderProperties.payment]: [null, []],
    [OrderProperties.status]: [null, []],
  });

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  onSubmitBtnClick(): void {
    if (this.form.invalid) return;
    this.submitForm.emit(this.form.value as Order);
  }
}
