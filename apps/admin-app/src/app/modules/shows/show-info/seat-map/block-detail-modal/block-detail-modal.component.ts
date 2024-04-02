import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AislesProperties,
  Block,
  BlockProperties,
  BlockTypes,
  Directions,
  DoorProperties,
  DoorTypes,
  FareType,
  SeatProperties,
  SeatStatuses,
  blockTypeList,
  directionList,
  doorTypeList,
  seatStatusList,
} from '@libs/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

export interface BlockDetails {
  data: Block;
  fareTypes?: FareType[];
  automaticIndex?: boolean;
}

@Component({
  selector: 'la-project-block-detail-modal',
  templateUrl: './block-detail-modal.component.html',
  styleUrls: ['./block-detail-modal.component.scss'],
})
export class BlockDetailModalComponent implements OnDestroy {
  readonly inputs$ = new BehaviorSubject<BlockDetails>({
    data: null,
    fareTypes: [],
    automaticIndex: false,
  });
  readonly fareTypes$ = this.inputs$.pipe(
    filter(({ data }) => !!data),
    map((data) => data?.fareTypes || [])
  );

  readonly activeModal = inject(NgbActiveModal);
  readonly BlockProperties = BlockProperties;
  readonly SeatProperties = SeatProperties;
  readonly DoorProperties = DoorProperties;
  readonly AislesProperties = AislesProperties;
  readonly seatStatusList = seatStatusList;
  readonly directionList = directionList;
  readonly doorTypeList = doorTypeList;

  readonly blockForm = this.fb.group({
    [BlockProperties.type]: [BlockTypes.None, [Validators.required]],
    [BlockProperties.door]: this.fb.group({
      [DoorProperties.name]: this.fb.control<string>(null, []),
      [DoorProperties.type]: this.fb.control<DoorTypes>(DoorTypes.Entrance, [
        Validators.required,
      ]),
    }),
    [BlockProperties.aisles]: this.fb.group({
      [AislesProperties.name]: this.fb.control<string>(null, []),
      [AislesProperties.direction]: this.fb.control<Directions>(
        Directions.North,
        []
      ),
    }),
    [BlockProperties.seat]: this.fb.group({
      [SeatProperties.code]: this.fb.control<string>(null, [
        Validators.required,
      ]),
      [SeatProperties.fareTypeId]: this.fb.control<string>(null, [
        Validators.required,
      ]),
      [SeatProperties.status]: this.fb.control<SeatStatuses>(
        SeatStatuses.Available,
        [Validators.required]
      ),
    }),
  });
  readonly destroyed$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder) {
    this.resetBlockForm({ emitEvent: false });
    this.inputs$
      .pipe(
        filter(({ data }) => !!data),
        takeUntil(this.destroyed$)
      )
      .subscribe((inputs) => this.updateBlockForm(inputs));
    this.blockForm.controls.type.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        withLatestFrom(this.inputs$)
      )
      .subscribe(([type, { automaticIndex }]) =>
        this.changeBlockFormStatus(type, automaticIndex)
      );
  }

  get doorCtrl() {
    return this.blockForm.controls[BlockProperties.door] || null;
  }

  get aislesCtrl() {
    return this.blockForm.controls[BlockProperties.aisles] || null;
  }

  get seatCtrl() {
    return this.blockForm.controls[BlockProperties.seat] || null;
  }

  get blockTypeList(): BlockTypes[] {
    const type = this.blockForm.value.type;
    if (type === BlockTypes.None || type === BlockTypes.Aisles) {
      return [BlockTypes.None, BlockTypes.Aisles];
    }
    if (type === BlockTypes.Wall || type === BlockTypes.Door) {
      return [BlockTypes.Wall, BlockTypes.Door];
    }
    if (type === BlockTypes.Seat) {
      return [BlockTypes.Seat];
    }
    return blockTypeList;
  }

  private updateBlockForm({ data, automaticIndex }: BlockDetails): void {
    this.resetBlockForm({ emitEvent: false });
    this.changeBlockFormStatus(data.type, automaticIndex);
    this.blockForm.patchValue(data, { emitEvent: false });
  }

  private changeBlockFormStatus(
    type: BlockTypes,
    automaticIndex = false
  ): void {
    if (type === BlockTypes.Door) {
      return this.doorCtrl.enable({ emitEvent: false });
    }
    if (type === BlockTypes.Aisles) {
      return this.aislesCtrl.enable({ emitEvent: false });
    }
    if (type === BlockTypes.Seat) {
      this.seatCtrl.enable({ emitEvent: false });
      if (automaticIndex) {
        this.seatCtrl.controls[SeatProperties.code].disable({
          emitEvent: false,
        });
      }
    }
  }

  private resetBlockForm(
    options: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    } = {}
  ): void {
    this.blockForm.reset({}, options);
    this.aislesCtrl.disable(options);
    this.doorCtrl.disable(options);
    this.seatCtrl.disable(options);
  }

  saveBlockChanges($event: MouseEvent): void {
    $event.preventDefault();
    if (this.blockForm.invalid) return;
    if (this.blockForm.value.type === BlockTypes.Seat) {
      this.seatCtrl.controls.code.enable({ emitEvent: false });
    }
    this.activeModal.close(this.blockForm.value);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
