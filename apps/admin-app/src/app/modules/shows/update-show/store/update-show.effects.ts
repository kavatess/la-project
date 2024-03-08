import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { UpdateShowService } from './update-show.service';
import { showFormActions } from './update-show.actions';
import { showIdSelector } from './update-show.selectors';

@Injectable()
export class UpdateShowEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: UpdateShowService
  ) {}

  readonly fetchShowId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.fetchShowId),
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

  readonly getShowData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.getShowData),
      withLatestFrom(showIdSelector),
      exhaustMap(([, showId]) =>
        this.service.getShowById(showId).pipe(
          map((data) => showFormActions.loadShowData({ data })),
          catchError((error) => {
            return of(showFormActions.loadShowDataError({ error }));
          })
        )
      )
    )
  );

  readonly getShowSectionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.getShowSectionList),
      withLatestFrom(showIdSelector),
      exhaustMap(([, showId]) =>
        this.service.getShowSectionList(showId).pipe(
          map((data) => showFormActions.loadSectionList({ data })),
          catchError((error) => {
            return of(showFormActions.loadSectionListError({ error }));
          })
        )
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

  readonly getShowFareTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showFormActions.getShowFareTypes),
      withLatestFrom(showIdSelector),
      exhaustMap(([, showId]) =>
        this.service.getShowFareTypes(showId).pipe(
          map((data) => showFormActions.loadFareTypes({ data })),
          catchError((error) => {
            return of(showFormActions.loadFareTypesError({ error }));
          })
        )
      )
    )
  );
}
