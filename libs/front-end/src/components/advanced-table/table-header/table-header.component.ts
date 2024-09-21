/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FilterTypes,
  SortingDirections,
  TableFilterItem,
  TableSorting,
} from '../advanced-table.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Option } from '@libs/models';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnChanges {
  @Input()
  field = '';

  @Input()
  title = '';

  @Input()
  filter: {
    type: FilterTypes;
    options?: Option[];
  } = null;

  @Input()
  sorting = false;

  @Input()
  loading = false;

  @Output()
  applyFilter = new EventEmitter<TableFilterItem>();

  @Output()
  removeFilter = new EventEmitter<string>();

  @Output()
  sortChange = new EventEmitter<TableSorting>();

  readonly FilterTypes = FilterTypes;

  sortIndex = 0;
  filterItem: TableFilterItem = null;
  input: any = null;

  constructor(private readonly fb: FormBuilder) {}

  getNumberFilterTxt(value: any): string {
    const hasMin = value.from ? `${value.from} < ` : '';
    const hasMax = value.to ? ` < ${value.to}` : '';
    return hasMin + this.field + hasMax;
  }

  getDateTimeFilterTxt(value: any): string {
    const hasMin = value.from ? `${value.from.toLocaleDateString()} < ` : '';
    const hasMax = value.to ? ` < ${value.to.toLocaleDateString()}` : '';
    return hasMin + this.field + hasMax;
  }

  getArrayFilterTxt(value: any): string {
    return `Only ${value.join(', ')}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] && this.filter) {
      this.onFilterTypeChange();
    }
  }

  onFilterTypeChange(): void {
    if (this.filter.type === FilterTypes.String) {
      this.input = this.fb.control(null, [Validators.required]);
      return;
    }
    if (this.filter.type === FilterTypes.Boolean) {
      this.input = this.fb.control(false, []);
      return;
    }
    if (this.filter.type === FilterTypes.Number) {
      this.input = this.fb.group({
        from: [null, []],
        to: [null, []],
      });
      return;
    }
    if (this.filter.type === FilterTypes.DateTime) {
      this.input = this.fb.group({
        from: [null, []],
        to: [null, []],
      });
      return;
    }
    if (this.filter.type === FilterTypes.Array) {
      this.input = this.fb.control([], [Validators.minLength(1)]);
    }
    return;
  }

  applyBtnOnClick(): void {
    if (!this.input) return;
    this.filterItem = {
      field: this.field,
      type: this.filter.type,
      value: this.input.value,
    };
    this.applyFilter.emit(this.filterItem);
  }

  removeBtnOnClick(): void {
    this.filterItem = null;
    this.removeFilter.emit(this.field);
  }

  sortBtnOnClick(): void {
    this.sortIndex += 1;
    if (this.sortIndex > 2) this.sortIndex = 0;
    this.sortChange.emit({
      field: this.field,
      direction: this.getSortDirectionFromIndex(),
    });
  }

  getSortDirectionFromIndex(): SortingDirections {
    if (this.sortIndex === 1) return SortingDirections.ASC;
    if (this.sortIndex === 2) return SortingDirections.DESC;
    return null;
  }
}
