import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  generateDefaultRowIndexes,
  generateDefaultSeatCode,
} from '@la-project/utils';
import {
  Block,
  BlockTypes,
  SeatProperties,
  SeatStatuses,
  Section,
  SectionProperties,
} from '@libs/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeWhile,
} from 'rxjs';
import { BlockDetailModalComponent } from './block-detail-modal/block-detail-modal.component';

@Component({
  selector: 'la-project-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
})
export class SeatMapComponent implements OnChanges, OnDestroy {
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
    [SectionProperties.indexReversed]: this.fb.control<boolean>(false, []),
    [SectionProperties.seatMap]: this.fb.control<Block[][]>([], []),
  });
  readonly subscriptions: Subscription[] = [];

  generatedData: Section = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
    this.subscriptions.length = 0;
  }

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

  get rowIndexesCtrl(): FormArray {
    return this.sectionForm.controls[SectionProperties.rowIndexes];
  }

  get indexReversedCtrl(): FormControl<boolean> {
    return this.sectionForm.controls[SectionProperties.indexReversed];
  }

  private get sectionVal(): Section {
    return this.sectionForm.value as Section;
  }

  private get seatMapCtrl(): FormControl<Block[][]> {
    return this.sectionForm.controls[SectionProperties.seatMap];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']) {
      this.generatedData = this.initialData;
      if (this.initialData) {
        this.sectionForm.patchValue(this.initialData, {
          onlySelf: true,
          emitEvent: false,
        });
        if (this.initialData.useRowIndex) {
          this.applyRowIndex(
            this.initialData.rowIndexes || [],
            this.initialData.indexReversed || false,
            false
          );
        } else {
          this.notUseRowIndex(false);
        }
        this.sectionForm.markAsPristine();
      } else {
        this.sectionForm.reset();
      }
    }
  }

  private enableRowIndexesCtrl(
    rowIndexes: string[] = [],
    emitEvent = true
  ): void {
    this.rowIndexesCtrl.enable({ emitEvent });
    this.rowIndexesCtrl.clear({ emitEvent });
    rowIndexes.forEach((rowCode, i) => {
      const control = this.fb.control(rowCode, [Validators.required]);
      control.valueChanges
        .pipe(
          takeWhile(() => this.rowIndexesCtrl.enabled),
          debounceTime(400),
          distinctUntilChanged(),
          filter((val) => !!val)
        )
        .subscribe(() => {
          this.rewriteSeatCodeInContainer(this.seatMapCtrl.value[i], i);
        });
      this.rowIndexesCtrl.push(control, { emitEvent });
    });
  }

  private enableIndexReversedCtrl(
    indexReversed = false,
    emitEvent = true
  ): void {
    this.indexReversedCtrl.enable({ emitEvent });
    this.indexReversedCtrl.setValue(indexReversed, { emitEvent });
    this.indexReversedCtrl.valueChanges
      .pipe(
        takeWhile(() => this.indexReversedCtrl.enabled),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.sectionVal.seatMap.forEach((row, index) => {
          if (index === this.seatMap.length - 1) return;
          this.rewriteSeatCodeInContainer(this.seatMap[index], index);
        });
      });
  }

  private applyRowIndex(
    rowIndexes: string[] = [],
    indexReversed = false,
    emitEvent = true
  ): void {
    this.enableRowIndexesCtrl(rowIndexes, emitEvent);
    this.enableIndexReversedCtrl(indexReversed, emitEvent);
  }

  private notUseRowIndex(emitEvent = true): void {
    this.rowIndexesCtrl.clear({ emitEvent });
    this.rowIndexesCtrl.disable({ emitEvent });
    this.indexReversedCtrl.disable({ emitEvent });
  }

  generateSeatMap($event: MouseEvent): void {
    $event.preventDefault();
    if (this.canGenerate) {
      this.generatedData = this.sectionVal as Section;
      const { useRowIndex, maxRow } = this.generatedData;
      if (useRowIndex) {
        const defaultRowIndexes = generateDefaultRowIndexes(maxRow);
        this.applyRowIndex(defaultRowIndexes, false);
      } else {
        this.notUseRowIndex();
      }
      this.seatMapCtrl.setValue(this.generateNewSeatMap());
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
      this.rewriteSeatCodeInContainer(container.data, rowIndex);
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
      this.rewriteSeatCodeInContainer(container.data, rowIndex);
      this.rewriteSeatCodeInContainer(
        previousContainer.data,
        this.getRowIndexFromContainer(previousContainer)
      );
    }
  }

  private getRowIndexFromContainer(container: CdkDropList<Block[]>) {
    const splittedPreId = container.id.split('-');
    return Number(splittedPreId[splittedPreId.length - 1]);
  }

  private rewriteSeatCodeInContainer(data: Block[], rowIndex: number): void {
    let count = this.sectionVal.indexReversed ? data.length - 1 : 0;

    for (const [index, block] of data.entries()) {
      if (block.type === BlockTypes.Seat) {
        if (this.sectionVal.indexReversed) {
          count -= 1;
        } else {
          count += 1;
        }
        data[index].seat.code = this.generateSeatCode(
          rowIndex,
          count,
          this.generatedData.useRowIndex
        );
      }
    }
  }

  openBlockModal(
    $event: MouseEvent,
    {
      block,
      rowIndex,
      colIndex,
    }: {
      block: Block;
      rowIndex: number;
      colIndex: number;
    }
  ) {
    $event.preventDefault();
    const modalRef = this.modalService.open(BlockDetailModalComponent);
    modalRef.componentInstance.initialData = block;
    modalRef.componentInstance.automaticIndex = this.generatedData.useRowIndex;
    modalRef.componentInstance.ngOnChanges(modalRef.componentInstance.changes);
    modalRef.result
      .then((changedBlock) => {
        if (changedBlock) {
          this.seatMapCtrl.value[rowIndex][colIndex] = changedBlock;
        }
      })
      .catch((err) => console.log(err));
  }
}
