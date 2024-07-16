import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractFormComponent, NgbTimepickerAdapter } from '@libs/front-end';
import {
  NgbTimeAdapter,
  NgbTimepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Show,
  ShowProperties,
  ShowStatuses,
  showStatusArr,
} from '@libs/models';

@Component({
  selector: 'la-project-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss'],
  providers: [
    NgbTimepickerConfig,
    { provide: NgbTimeAdapter, useClass: NgbTimepickerAdapter },
  ],
})
export class ShowFormComponent
  extends AbstractFormComponent<Show>
  implements OnChanges
{
  @Input()
  useHeader = true;
  @Input()
  useInternalBtn = true;

  readonly form = this.fb.group({
    // Basic info
    [ShowProperties.title]: [
      null,
      [Validators.required, Validators.maxLength(256)],
    ],
    [ShowProperties.slogan]: [
      null,
      [Validators.maxLength(256)], //
    ],
    [ShowProperties.types]: [[]],
    [ShowProperties.logo]: [null],
    [ShowProperties.description]: [
      null,
      [Validators.maxLength(4096)], //
    ],
    // Location & Time
    [ShowProperties.location]: [
      null,
      [Validators.required, Validators.maxLength(256)],
    ],
    [ShowProperties.startDate]: [
      null,
      [Validators.required], //
    ],
    [ShowProperties.startTime]: [
      null,
      [Validators.required], //
    ],
    [ShowProperties.endDate]: [
      null,
      [Validators.required], //
    ],
    [ShowProperties.endTime]: [
      null,
      [Validators.required], //
    ],
    [ShowProperties.startBookingDate]: [
      null,
      [Validators.required], //
    ],
    [ShowProperties.startBookingTime]: [
      null,
      [Validators.required], //
    ],
    [ShowProperties.endBookingDate]: [
      null,
      [Validators.required], //
    ],
    [ShowProperties.endBookingTime]: [
      null,
      [Validators.required], //
    ],
    // Other
    // [ShowProperties.artists]: [[]],
    [ShowProperties.note]: [
      null,
      [Validators.maxLength(4096)], //
    ],
    [ShowProperties.status]: [
      ShowStatuses.Created,
      [Validators.required], //
    ],
  }) as FormGroup;
  readonly ShowProperties = ShowProperties;
  readonly showStatusArr = showStatusArr;

  constructor(
    private readonly fb: FormBuilder,
    private readonly timepickerConfig: NgbTimepickerConfig
  ) {
    super();
    this.timepickerConfig.seconds = false;
    this.timepickerConfig.spinners = false;
  }
}
