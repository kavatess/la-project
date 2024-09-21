/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  defaultSorting,
  Pagination,
  TableFilter,
  TableSorting,
} from '../advanced-table.model';

export interface TableParentService<T> {
  getData(
    filter: TableFilter,
    sorting: TableSorting,
    pagination: Pagination
  ): Observable<T[]>;
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  service: TableParentService<any> = {
    getData: (): Observable<any[]> => of([]),
  };

  getData(
    pagination: Pagination,
    filter: TableFilter,
    sorting: TableSorting = defaultSorting
  ): Observable<any[]> {
    return this.service.getData(filter, sorting, pagination);
  }

  replaceService(service: TableParentService<any>): void {
    this.service = service;
  }
}
