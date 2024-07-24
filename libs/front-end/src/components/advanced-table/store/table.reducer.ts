/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { createReducer, on } from '@ngrx/store';
import { tableActions } from './table.actions';
import {
  Pagination,
  TableColumn,
  TableFilter,
  TableFilterModes,
  TableSorting,
} from '../advanced-table.model';

export interface TableState {
  loading: boolean;
  pagination: Pagination;
  columns: {
    [key: string]: TableColumn;
  };
  data: any[];
  filter: TableFilter;
  sorting: TableSorting;
}

const initialState: TableState = {
  loading: false,
  pagination: { pageIndex: 0, pageSize: 50 },
  columns: {},
  data: [],
  filter: {
    mode: TableFilterModes.Multiple,
    items: [],
  },
  sorting: null,
};

export const tableReducer = createReducer(
  initialState,
  on(
    tableActions.getTableData,
    tableActions.changeSorting,
    tableActions.startFiltering,
    tableActions.removeFilter,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(tableActions.updateTableProps, (state, { columns, paginationSize }) => ({
    ...state,
    columns,
    pagination: {
      ...state.pagination,
      pageSize: paginationSize,
    },
  })),
  on(tableActions.loadTableData, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),
  on(tableActions.loadTableDataError, (state) => ({
    ...state,
    loading: false,
  })),
  on(tableActions.changeSorting, (state, { sorting }) => ({
    ...state,
    sorting,
  })),
  on(tableActions.startFiltering, (state, { item }) => ({
    ...state,
    filter: {
      ...state.filter,
      items:
        state.filter.mode === TableFilterModes.Single
          ? [item]
          : [...state.filter.items, item],
    },
  })),
  on(tableActions.removeFilter, (state, { field }) => ({
    ...state,
    filter: {
      ...state.filter,
      items:
        state.filter.mode === TableFilterModes.Multiple
          ? [...state.filter.items.filter((item) => item.field !== field)]
          : [],
    },
  }))
);
