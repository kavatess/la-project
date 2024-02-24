import { Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
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

@Component({
  selector: 'la-project-block-detail-modal',
  templateUrl: './block-detail-modal.component.html',
  styleUrls: ['./block-detail-modal.component.scss'],
})
export class BlockDetailModalComponent implements OnChanges, OnDestroy {
  @Input()
  initialData: Block & {
    fareTypes?: FareType[];
  } = null;
  @Input()
  automaticIndex = false;

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
      [DoorProperties.type]: this.fb.control<DoorTypes>(DoorTypes.Entrance, []),
      [DoorProperties.direction]: this.fb.control<Directions>(
        Directions.North,
        []
      ),
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

  blockTypeList = blockTypeList;

  constructor(private readonly fb: FormBuilder) {}

  get aislesCtrl() {
    return this.blockForm.controls[BlockProperties.aisles] || null;
  }

  get doorCtrl() {
    return this.blockForm.controls[BlockProperties.door] || null;
  }

  get seatCtrl() {
    return this.blockForm.controls[BlockProperties.seat] || null;
  }

  ngOnDestroy(): void {
    this.resetBlockForm();
    this.blockForm.markAsPristine();
  }

  ngOnChanges(): void {
    if (this.initialData) {
      this.updateBlockTypeList(this.initialData.type);
      this.updateBlockForm(this.initialData, {
        emitEvent: false,
      });
    } else {
      this.resetBlockForm({
        emitEvent: false,
      });
    }
    if (this.automaticIndex && this.initialData.type === BlockTypes.Seat) {
      this.seatCtrl.controls[SeatProperties.code].disable({
        emitEvent: false,
      });
    }
  }

  updateBlockForm(
    data: Block & {
      fareTypes?: FareType[];
    },
    options: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    } = {}
  ) {
    this.resetBlockForm(options);
    if (data.type === BlockTypes.Aisles) {
      this.aislesCtrl.enable(options);
    } else if (data.type === BlockTypes.Door) {
      this.doorCtrl.enable(options);
    } else if (data.type === BlockTypes.Seat) {
      this.seatCtrl.enable(options);
    }
    this.blockForm.patchValue(data, options);
  }

  updateBlockTypeList(type: BlockTypes): void {
    if (type === BlockTypes.None || type === BlockTypes.Aisles) {
      this.blockTypeList = [BlockTypes.None, BlockTypes.Aisles];
      return;
    }
    if (type === BlockTypes.Wall || type === BlockTypes.Door) {
      this.blockTypeList = [BlockTypes.Wall, BlockTypes.Door];
      return;
    }
    if (type === BlockTypes.Seat) {
      this.blockTypeList = [BlockTypes.Seat];
      return;
    }
    this.blockTypeList = blockTypeList;
  }

  resetBlockForm(
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
    this.activeModal.close(this.blockForm.valid ? this.blockForm.value : null);
  }
}
