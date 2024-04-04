import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FareType, FareTypeProperties } from '@libs/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FareTypesTableService } from '../fare-types-table.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'la-project-fare-type-modal',
  templateUrl: './fare-type-modal.component.html',
  styleUrls: ['./fare-type-modal.component.scss'],
})
export class FareTypeModalComponent implements OnChanges {
  @Input()
  showId = '';
  @Input()
  modalMode: 'add' | 'edit' = 'edit';
  @Input()
  data!: FareType;

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: FareTypesTableService
  ) {}

  ngOnChanges(): void {
    if (this.data) {
      this.fareTypeForm.patchValue(this.data);
    }
  }

  submitFareTypeForm(): void {
    if (this.fareTypeForm.valid) {
      const obs =
        this.modalMode === 'add'
          ? this.api.addFareType(
              this.showId,
              this.fareTypeForm.value as FareType
            )
          : this.api.editFareTypeById(
              this.data.id,
              this.fareTypeForm.value as FareType
            );

      obs
        .pipe(
          catchError((error) => {
            console.error(error);
            return of(null);
          })
        )
        .subscribe((data) => {
          this.activeModal.close(data);
        });
    }
  }
}
