/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  TableColumn,
  TableFilterItem,
  TableFilterModes,
  TableSorting,
} from './advanced-table.model';
import { Store } from '@ngrx/store';
import { tableActions, tableSelectors, TableState } from './store';

@Component({
  selector: 'app-advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.scss'],
})
export class AdvancedTableComponent implements OnInit {
  @Input()
  hover = false;

  @Input()
  bordered = false;

  @Input()
  hasIndex = false;

  @Input()
  columns: TableColumn[] = [];

  @Input()
  paginationSize = 50;

  @Input()
  filterMode: TableFilterModes = TableFilterModes.Multiple;

  @Input()
  itemClickable = false;

  @Output()
  itemClick = new EventEmitter();

  readonly data$ = this.store.select(tableSelectors.data);
  readonly loading$ = this.store.select(tableSelectors.loading);

  constructor(private readonly store: Store<TableState>) {}

  ngOnInit(): void {
    this.store.dispatch(tableActions.getTableData());
  }

  tableItemOnClick(item: any): void {
    if (!this.itemClickable) return;
    this.itemClick.emit(item);
  }

  onApplyFilter(filter: TableFilterItem): void {
    this.store.dispatch(tableActions.startFiltering({ item: filter }));
  }

  onRemoveFilter(field: string): void {
    this.store.dispatch(tableActions.removeFilter({ field }));
  }

  onSortChange(sorting: TableSorting): void {
    this.store.dispatch(tableActions.changeSorting({ sorting }));
  }
}
