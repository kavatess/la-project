/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  TableColumn,
  TableFilterItem,
  TableFilterModes,
  TableSorting,
} from '../advanced-table.model';

// Form Actions
export const tableActions = createActionGroup({
  source: 'table',
  events: {
    updateTableProps: props<{
      columns: {
        [key: string]: TableColumn;
      };
      paginationSize: number;
      filterMode: TableFilterModes;
      sorting: boolean;
    }>(),
    getTableData: emptyProps(),
    loadTableData: props<{ data: any[] }>(),
    loadTableDataError: props<{ error: Error }>(),
    changeSorting: props<{
      sorting: TableSorting;
    }>(),
    startFiltering: props<{ item: TableFilterItem }>(),
    removeFilter: props<{ field: string }>(),
  },
});
