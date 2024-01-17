import {
  CdkDragDrop,
  CdkDropList,
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

  generatedData: Section = null;

  constructor(private readonly fb: FormBuilder) {}

  get seatMap(): Block[][] {
    return this.sectionVal[SectionProperties.seatMap] || [];
  }

  get canGenerate(): boolean {
    if (this.sectionForm.invalid) return false;
    if (!this.generatedData) return true;
    const { maxRow, maxCol, seatNumber } = this.sectionVal;
    return (
      maxRow !== this.generatedData.maxRow ||
      maxCol !== this.generatedData.maxCol ||
      seatNumber !== this.generatedData.seatNumber
    );
  }

  private get sectionVal(): Section {
    return this.sectionForm.value as Section;
  }

  private get seatMapCtrl(): FormControl<Block[][]> {
    return this.sectionForm.controls[SectionProperties.seatMap];
  }

  private get rowIndexesArrCtrl(): FormArray {
    return this.sectionForm.controls[SectionProperties.rowIndexes] as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']) {
      this.generatedData = this.initialData;
      if (this.initialData) {
        this.sectionForm.patchValue(this.initialData, {
          onlySelf: true,
          emitEvent: false,
        });
        this.sectionForm.markAsPristine();
      } else {
        this.sectionForm.reset();
      }
    }
  }

  generateSeatMap($event: MouseEvent): void {
    if (this.canGenerate) {
      if (this.sectionVal[SectionProperties.useRowIndex]) {
        this.applyRowIndex();
      }
      this.seatMapCtrl.setValue(this.generateNewSeatMap());
      this.generatedData = this.sectionVal as Section;
    }
    $event.preventDefault();
  }

  private applyRowIndex(): void {
    for (let i = 0; i < this.sectionVal.maxRow; i++) {
      this.rowIndexesArrCtrl.push(
        this.fb.control(i <= 26 ? String.fromCharCode(i + 65) : null, [
          Validators.required,
        ])
      );
    }
  }

  private generateNewSeatMap(): Block[][] {
    const { maxRow, maxCol } = this.sectionVal;
    return new Array(maxRow + 1)
      .fill(null)
      .map((v1, row) =>
        new Array(maxCol + 2)
          .fill(null)
          .map((v2, col) => this.generateBlock(row, col))
      );
  }

  private generateBlock(row: number, col: number): Block {
    const { maxRow, maxCol, seatNumber } = this.sectionVal;
    if (col === 0 || col === maxCol + 1 || row === maxRow) {
      return { type: BlockTypes.Wall };
    }
    if (row * maxCol + col <= seatNumber) {
      return {
        type: BlockTypes.Seat,
        seat: {
          [SeatProperties.code]: this.generateSeatCode(
            row,
            col,
            this.sectionVal.useRowIndex
          ),
          [SeatProperties.status]: SeatStatuses.Available,
        },
      };
    }
    return { type: BlockTypes.None };
  }

  private generateSeatCode(
    row: number,
    col: number,
    useRowIndex = true
  ): string {
    if (useRowIndex) {
      const colIndex = col < 10 ? '0' + col : col;
      return `${this.sectionVal.rowIndexes[row]}${colIndex}`;
    }
    return generateDefaultSeatCode(row, col);
  }

  dropSeat(event: CdkDragDrop<Block[]>, rowIndex: number) {
    if (
      rowIndex === this.generatedData.maxRow ||
      event.currentIndex === 0 ||
      event.currentIndex === this.generatedData.maxCol + 1
    ) {
      return;
    }
    if (event.previousContainer === event.container) {
      this.moveSeatInSameRow(event, rowIndex);
    } else {
      this.transferSeatToAnotherRow(event, rowIndex);
    }
  }

  private moveSeatInSameRow(
    { container, previousIndex, currentIndex }: CdkDragDrop<Block[]>,
    rowIndex: number
  ): void {
    moveItemInArray(container.data, previousIndex, currentIndex);
    if (this.generatedData.useRowIndex) {
      this.rewriteSeatCodeInContainer(container, rowIndex);
    }
  }

  private transferSeatToAnotherRow(
    {
      previousContainer,
      container,
      previousIndex,
      currentIndex,
    }: CdkDragDrop<Block[]>,
    rowIndex: number
  ): void {
    transferArrayItem(
      previousContainer.data,
      container.data,
      previousIndex,
      currentIndex
    );
    transferArrayItem(
      container.data,
      previousContainer.data,
      currentIndex + 1,
      previousIndex
    );
    if (this.generatedData.useRowIndex) {
      this.rewriteSeatCodeInContainer(container, rowIndex);
      const splittedPreId = previousContainer.id.split('-');
      const previousRowIndex = Number(splittedPreId[splittedPreId.length - 1]);
      this.rewriteSeatCodeInContainer(previousContainer, previousRowIndex);
    }
  }

  private rewriteSeatCodeInContainer(
    container: CdkDropList<Block[]>,
    rowIndex: number
  ): void {
    let count = 0;
    for (const [index, block] of container.data.entries()) {
      if (block.type === BlockTypes.Seat) {
        count += 1;
        container.data[index].seat.code = this.generateSeatCode(
          rowIndex,
          count,
          this.generatedData.useRowIndex
        );
      }
    }
  }
}
