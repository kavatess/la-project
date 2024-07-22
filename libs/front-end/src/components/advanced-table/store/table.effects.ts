import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { tableActions } from './table.actions';
import { TableState } from './table.reducer';
import { TableService } from './table.service';
import { tableSelectors } from './table.selectors';

@Injectable()
export class TableEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<TableState>,
    private readonly service: TableService
  ) {}

  readonly getTableData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        tableActions.getTableData,
        tableActions.changeSorting,
        tableActions.startFiltering,
        tableActions.removeFilter
      ),
      withLatestFrom(
        this.store.select(tableSelectors.pagination),
        this.store.select(tableSelectors.filter),
        this.store.select(tableSelectors.sorting)
      ),
      exhaustMap(([, pagination, filter, sorting]) =>
        this.service.getData(pagination, filter, sorting).pipe(
          map((data) => tableActions.loadTableData({ data })),
          catchError((error) => {
            return of(tableActions.loadTableDataError({ error }));
          })
        )
      )
    )
  );
}
