/* eslint-disable @typescript-eslint/no-explicit-any */

import { Option } from '@libs/models';

export enum FilterTypes {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  DateTime = 'datetime',
  Array = 'array',
}

export interface TableColumn {
  field: string;
  title: string;
  pipe?: (value: any) => any;
  // customTemplate?: any;
  filter?: {
    type: FilterTypes;
    options?: Option[];
  };
  sorting?: boolean;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export enum TableFilterModes {
  Single = 'single',
  Multiple = 'multiple',
}

export interface TableFilterItem {
  field: string;
  type: FilterTypes;
  value:
    | string
    | boolean
    | string[]
    | number[]
    | {
        from?: number | Date;
        to?: number | Date;
      };
}

export interface TableFilter {
  mode: TableFilterModes;
  items: TableFilterItem[];
}

export enum SortingDirections {
  ASC = 'asc',
  DESC = 'desc',
}

export interface TableSorting {
  field: string;
  direction: SortingDirections;
}

export const defaultSorting = {
  field: 'createdAt',
  direction: SortingDirections.DESC,
};
