import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { profileActions } from './profile.actions';
import { ProfileService } from './profile.service';
import { ProfileState } from './profile.reducer';
import { AuthService } from '../../../auth/auth.service';
import { profileFormSelector } from './profiles.selectors';

@Injectable()
export class ProfileEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<ProfileState>,
    private readonly service: ProfileService,
    private readonly authService: AuthService
  ) {}

  readonly getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      exhaustMap(() =>
        this.service.getProfile().pipe(
          map((data) => profileActions.loadProfile({ data })),
          catchError((error) => {
            return of(profileActions.getProfileError({ error }));
          })
        )
      )
    )
  );

  readonly updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updateProfile),
      withLatestFrom(this.store.select(profileFormSelector)),
      exhaustMap(([, newProfile]) =>
        this.service.updateProfile(newProfile).pipe(
          map((data) => profileActions.loadProfile({ data })),
          catchError((error) => {
            return of(profileActions.updateProfileError({ error }));
          })
        )
      )
    )
  );

  readonly changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.changePassword),
      exhaustMap(({ oldPassword, newPassword }) =>
        this.service.changePassword(oldPassword, newPassword).pipe(
          map(() => {
            this.authService.logout();
            return profileActions.changePasswordSuccess();
          }),
          catchError((error) => {
            return of(profileActions.changePasswordError({ error }));
          })
        )
      )
    )
  );
}
