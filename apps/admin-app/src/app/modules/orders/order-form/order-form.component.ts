import { Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractFormComponent } from '@libs/front-end';
import {
  Order,
  OrderItemProperties,
  OrderItemTypes,
  OrderProperties,
  OrderStatuses,
  ProductProperties,
} from '@libs/models';

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
  readonly OrderItemProperties = OrderItemProperties;
  readonly ProductProperties = ProductProperties;
  readonly orderStatuses = Object.keys(OrderStatuses).map((key) => key);

  @Output()
  submitForm = new EventEmitter<Order>();

  readonly form = this.fb.group({
    [OrderProperties.showId]: [null, [Validators.required]],
    [OrderProperties.customerId]: [null, [Validators.required]],
    [OrderProperties.orderItems]: this.fb.array([]),
    [OrderProperties.paymentId]: [null, [Validators.required]],
    [OrderProperties.status]: [null, []],
  });

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  get orderItemsCtrl(): FormArray {
    return this.form.controls[OrderProperties.orderItems] as FormArray;
  }

  createOrderItem(): FormGroup {
    return this.fb.group({
      [OrderItemProperties.type]: [OrderItemTypes.Seat, [Validators.required]],
      [OrderItemProperties.price]: [null, [Validators.required]],
      [OrderItemProperties.productId]: [null, [Validators.required]],
      [OrderItemProperties.quantity]: [
        null,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  removeOrderItemAt(index: number): void {
    this.orderItemsCtrl.removeAt(index);
  }

  onSubmitBtnClick(): void {
    if (this.form.invalid) return;
    this.submitForm.emit(this.form.value as Order);
  }
}
