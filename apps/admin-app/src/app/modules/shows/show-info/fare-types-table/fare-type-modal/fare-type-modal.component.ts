import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FareType, FareTypeProperties } from '@libs/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'la-project-fare-type-modal',
  templateUrl: './fare-type-modal.component.html',
  styleUrls: ['./fare-type-modal.component.scss'],
})
export class FareTypeModalComponent implements OnChanges {
  @Input() data!: FareType;

  readonly FareTypeProperties = FareTypeProperties;
  readonly activeModal = inject(NgbActiveModal);
  readonly fareTypeForm = this.fb.group({
    [FareTypeProperties.title]: this.fb.control<string>(null, [
      Validators.required,
    ]),
    [FareTypeProperties.displayColor]: this.fb.control<string>(null, []),
    [FareTypeProperties.price]: this.fb.control<number>(null, [
      Validators.required,
    ]),
    [FareTypeProperties.description]: this.fb.control<string>(null, []),
    [FareTypeProperties.note]: this.fb.control<string>(null, []),
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.fareTypeForm.patchValue(this.data);
    }
  }
}
