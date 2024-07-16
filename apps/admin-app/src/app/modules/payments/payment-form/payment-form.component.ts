import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '@libs/front-end';
import { Payment, PaymentProperties, PaymentStatuses } from '@libs/models';

@Component({
  selector: 'la-project-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent
  extends AbstractFormComponent<Payment>
  implements OnChanges
{
  @Input()
  useInternalBtn = true;

  readonly PaymentProperties = PaymentProperties;
  readonly PaymentStatuses = PaymentStatuses;

  readonly form = this.fb.group({
    [PaymentProperties.title]: [null, [Validators.required]],
    [PaymentProperties.description]: [null, []],
    [PaymentProperties.apiKey]: [null, []],
    [PaymentProperties.status]: [null, [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {
    super();
  }
}
