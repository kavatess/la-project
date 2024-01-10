import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { UpdateShowService } from './update-show.service';
import { showFormActions } from './update-show.actions';
import { seatMapSelectors } from './update-show.selectors';

@Injectable()
export class UpdateShowEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: UpdateShowService
  ) {}

  readonly getShowById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.getShowById),
      exhaustMap((action) =>
        this.service.getShowById(action.showId).pipe(
          map((data) => showFormActions.loadShowData({ data })),
          catchError((error) => {
            return of(showFormActions.loadShowDataError({ error }));
          })
        )
      )
    )
  );

  readonly getSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.getSection),
      withLatestFrom(seatMapSelectors.selectedSectionId),
      exhaustMap(([, sectionId]) =>
        sectionId
          ? this.service.getSectionById(sectionId).pipe(
              map((data) => showFormActions.loadSelectedSection({ data })),
              catchError((error) => {
                return of(showFormActions.loadSelectedSectionError({ error }));
              })
            )
          : of(showFormActions.loadSelectedSection({ data: null }))
      )
    )
  );

  readonly changeSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.changeSection),
      exhaustMap((action) =>
        this.service.getSectionById(action.sectionId).pipe(
          map((data) => showFormActions.loadSelectedSection({ data })),
          catchError((error) => {
            return of(showFormActions.loadSelectedSectionError({ error }));
          })
        )
      )
    )
  );
}
