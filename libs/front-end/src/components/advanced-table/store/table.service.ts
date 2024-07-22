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

@Injectable({
  providedIn: 'platform',
})
export class TableService {
  getData(
    pagination: Pagination,
    filter: TableFilter,
    sorting: TableSorting = defaultSorting
  ): Observable<any[]> {
    return of([]);
  }
}
