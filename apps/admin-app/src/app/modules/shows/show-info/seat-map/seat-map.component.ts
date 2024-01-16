import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { generateDefaultSeatCode } from '@la-project/utils';
import {
  Block,
  BlockTypes,
  SeatProperties,
  SeatStatuses,
  Section,
  SectionProperties,
} from '@libs/models';

@Component({
  selector: 'la-project-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
})
export class SeatMapComponent implements OnChanges {
  @Input()
  initialData: Section = null;

  readonly SectionProperties = SectionProperties;
  readonly BlockTypes = BlockTypes;
  readonly sectionForm = this.fb.group({
    [SectionProperties.title]: this.fb.control<string>(null, [
      Validators.required,
    ]),
    [SectionProperties.maxRow]: this.fb.control<number>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    [SectionProperties.maxCol]: this.fb.control<number>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    [SectionProperties.seatNumber]: this.fb.control<number>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    [SectionProperties.index]: this.fb.control<number>(null, []),
    [SectionProperties.useRowIndex]: this.fb.control<boolean>(true, []),
    [SectionProperties.rowIndexes]: this.fb.array<string>([], []),
    [SectionProperties.seatMap]: this.fb.control<Block[][]>([], []),
  });

  defaultData: Section = null;

  constructor(private readonly fb: FormBuilder) {}

  get seatMap(): Block[][] {
    return this.sectionForm.value[SectionProperties.seatMap] || [];
  }

  get seatMapCtrl(): FormControl<Block[][]> {
    return this.sectionForm.controls[SectionProperties.seatMap];
  }

  get canGenerate(): boolean {
    if (this.sectionForm.invalid) return false;
    if (!this.defaultData) return true;
    const { maxRow, maxCol, seatNumber } = this.sectionForm.value;
    return (
      maxRow !== this.defaultData.maxRow ||
      maxCol !== this.defaultData.maxCol ||
      seatNumber !== this.defaultData.seatNumber
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']) {
      this.defaultData = this.initialData;
      if (this.initialData) {
        this.sectionForm.patchValue(this.initialData, {
          onlySelf: true,
          emitEvent: false,
        });
        this.sectionForm.markAsPristine({
          onlySelf: true,
        });
      } else {
        this.sectionForm.reset();
      }
    }
  }

  generateSeatMap($event: MouseEvent): void {
    if (this.canGenerate) {
      this.defaultData = this.sectionForm.value as Section;
      this.seatMapCtrl.setValue(this.generateNewSeatMap());
      if (this.sectionForm.value[SectionProperties.useRowIndex]) {
        this.applyRowIndex();
      }
    }
    $event.preventDefault();
  }

  private applyRowIndex(): void {
    const rowIndexArray = this.sectionForm.controls[
      SectionProperties.rowIndexes
    ] as FormArray;
    for (let i = 0; i < this.defaultData.maxRow; i++) {
      rowIndexArray.push(
        this.fb.control(i <= 26 ? String.fromCharCode(i + 65) : null)
      );
    }
  }

  private generateNewSeatMap(): Block[][] {
    const { maxRow, maxCol } = this.sectionForm.value;
    return new Array(maxRow + 1)
      .fill(null)
      .map((v1, row) =>
        new Array(maxCol + 2)
          .fill(null)
          .map((v2, col) => this.generateBlock(row, col))
      );
  }

  private generateBlock(row: number, col: number): Block {
    const { maxRow, maxCol, seatNumber } = this.sectionForm.value;
    const block: Block = {
      row,
      col,
      type: BlockTypes.None,
    };
    if (col === 0 || col === maxCol + 1 || row === maxRow) {
      block.type = BlockTypes.Wall;
    } else if (row * maxCol + col <= seatNumber) {
      block.type = BlockTypes.Seat;
      block.seat = {
        [SeatProperties.code]: generateDefaultSeatCode(row, col),
        [SeatProperties.status]: SeatStatuses.Available,
      };
    }
    return block;
  }

  dropSeat(event: CdkDragDrop<Block[]>, rowIndex: number) {
    if (
      rowIndex === this.defaultData.maxRow ||
      event.currentIndex === 0 ||
      event.currentIndex === this.defaultData.maxCol + 1
    ) {
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex + 1,
        event.previousIndex
      );
    }
  }
}
