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
    pagination: Pagination,
    filter: TableFilter,
    sorting: TableSorting
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
    return this.service.getData(pagination, filter, sorting);
  }

  replaceService(service: TableParentService<any>): void {
    this.service = service;
  }
}
