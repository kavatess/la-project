import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UpdateShowService } from './update-show.service';
import { showFormActions } from './update-show.actions';

@Injectable()
export class UpdateShowEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: UpdateShowService
  ) {}

  readonly getShowDataById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.getShowDataById),
      exhaustMap((action) =>
        this.service.getShowDetail(action.showId).pipe(
          map((data) => showFormActions.loadData({ data })),
          catchError((error) => {
            return of(showFormActions.loadDataError({ error }));
          })
        )
      )
    )
  );
}
