import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTimepickerAdapter } from '@libs/front-end';
import {
  NgbTimeAdapter,
  NgbTimepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Show,
  ShowProperties,
  ShowStatuses,
  showStatusArr,
  FormState,
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
export class ShowFormComponent implements OnChanges {
  @Input()
  useHeader = true;
  @Input()
  useInternalBtn = true;
  @Input()
  formState: FormState<Show>;
  @Input()
  disabled: boolean | string[] = false;

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
    this.timepickerConfig.seconds = false;
    this.timepickerConfig.spinners = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formState']) {
      this.setFormState(this.formState);
    }
    if (changes['disabled']) {
      this.setFormDisability(this.disabled);
    }
  }

  private setFormState(state: FormState<Show>): void {
    this.form.patchValue(state.data);
    if (state.pristine) {
      return this.form.markAsPristine();
    }

    if (state.touched) {
      this.form.markAsTouched({ onlySelf: true });
    } else {
      this.form.markAsUntouched();
    }

    if (state.dirty) {
      this.form.markAsDirty({ onlySelf: true });
    }
  }

  private setFormDisability(disabled: boolean | string[]): void {
    if (typeof disabled === 'boolean') {
      if (this.disabled) {
        return this.form.disable();
      } else {
        return this.form.enable();
      }
    }
    if (Array.isArray(disabled)) {
      disabled.forEach((ctrlName) => this.form.get(ctrlName).disable());
    }
  }
}
