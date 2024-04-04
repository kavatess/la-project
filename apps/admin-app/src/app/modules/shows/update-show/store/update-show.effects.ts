import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { UpdateShowService } from './update-show.service';
import { updateFormActions } from './update-show.actions';
import { showIdSelector } from './update-show.selectors';
import { Store } from '@ngrx/store';
import { UpdateShowState } from './update-show.reducer';

@Injectable()
export class UpdateShowEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<UpdateShowState>,
    private readonly service: UpdateShowService
  ) {}

  readonly fetchShowId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFormActions.fetchShowId),
      exhaustMap((action) =>
        this.service.getShowById(action.showId).pipe(
          map((data) => updateFormActions.loadShowData({ data })),
          catchError((error) => {
            return of(updateFormActions.loadShowDataError({ error }));
          })
        )
      )
    )
  );

  readonly getShowData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFormActions.getShowData),
      withLatestFrom(this.store.select(showIdSelector)),
      exhaustMap(([, showId]) =>
        this.service.getShowById(showId).pipe(
          map((data) => updateFormActions.loadShowData({ data })),
          catchError((error) => {
            return of(updateFormActions.loadShowDataError({ error }));
          })
        )
      )
    )
  );

  readonly getShowSectionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFormActions.getShowSectionList),
      withLatestFrom(this.store.select(showIdSelector)),
      exhaustMap(([, showId]) =>
        this.service.getShowSectionList(showId).pipe(
          map((data) => updateFormActions.loadSectionList({ data })),
          catchError((error) => {
            return of(updateFormActions.loadSectionListError({ error }));
          })
        )
      )
    )
  );

  readonly changeSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFormActions.changeSection),
      exhaustMap((action) =>
        this.service.getSectionById(action.sectionId).pipe(
          map((data) => updateFormActions.loadSelectedSection({ data })),
          catchError((error) => {
            return of(updateFormActions.loadSelectedSectionError({ error }));
          })
        )
      )
    )
  );

  readonly getShowFareTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFormActions.getShowFareTypes),
      withLatestFrom(this.store.select(showIdSelector)),
      exhaustMap(([, showId]) =>
        this.service.getShowFareTypes(showId).pipe(
          map((data) => updateFormActions.loadFareTypes({ data })),
          catchError((error) => {
            return of(updateFormActions.loadFareTypesError({ error }));
          })
        )
      )
    )
  );
}
