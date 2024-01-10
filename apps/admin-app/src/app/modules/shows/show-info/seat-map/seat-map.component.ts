import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Block, BlockTypes, Section, SectionProperties } from '@libs/models';

@Component({
  selector: 'la-project-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
})
export class SeatMapComponent implements OnChanges {
  @Input()
  initialData: Section = null;

  readonly SectionProperties = SectionProperties;
  readonly sectionForm = this.fb.group({
    [SectionProperties.title]: this.fb.control(null, [Validators.required]),
    [SectionProperties.maxRow]: this.fb.control(null, [
      Validators.required,
      Validators.min(1),
    ]),
    [SectionProperties.maxCol]: this.fb.control(null, [
      Validators.required,
      Validators.min(1),
    ]),
    [SectionProperties.seatNumber]: this.fb.control(null, [
      Validators.required,
      Validators.min(1),
    ]),
    [SectionProperties.index]: this.fb.control(null, []),
  } as Record<keyof Section, FormControl>);
  readonly seatMap: Block[][] = [];

  constructor(private readonly fb: FormBuilder) {}

  get canGenerate(): boolean {
    if (this.sectionForm.invalid) return false;
    if (!this.initialData) return true;
    const { maxRow, maxCol, seatNumber } = this.sectionForm.value;
    return (
      maxRow !== this.initialData.maxRow ||
      maxCol !== this.initialData.maxCol ||
      seatNumber !== this.initialData.seatNumber
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']) {
      if (this.initialData) {
        this.seatMap.push(...this.initialData.seatMap);
        this.sectionForm.patchValue(this.initialData);
        this.sectionForm.markAsPristine();
      } else {
        this.sectionForm.reset();
        this.seatMap.length = 0;
      }
    }
  }

  generateSeatMap($event: MouseEvent): void {
    if (this.canGenerate) {
      const { maxRow, maxCol, seatNumber } = this.sectionForm.value;
      const newSeatMap: Block[][] = new Array(maxRow)
        .fill([])
        .map((v1, row) => {
          return new Array(maxCol).fill([]).map((v2, col) => {
            const type =
              (row + 1) * col <= seatNumber ? BlockTypes.Seat : BlockTypes.None;
            return { row, col, type };
          });
        });
      this.seatMap.length = 0;
      this.seatMap.push(...newSeatMap);
      // console.log(newSeatMap, this.seatMap);
    }
    $event.preventDefault();
  }
}
