/* eslint-disable @typescript-eslint/no-empty-interface */
import { createReducer, on } from '@ngrx/store';
import { FormState, User } from '@libs/models';
import { profileActions } from './profile.actions';

export interface ProfileFormState extends FormState<User> {}

export interface ProfileState {
  profileForm: ProfileFormState;
}

const initialState: ProfileState = {
  profileForm: null,
};

export const profileReducer = createReducer(
  initialState,
  on(profileActions.loadProfile, (state, { data }) => ({
    ...state,
    profileForm: {
      data,
      valid: true,
      pristine: true,
      dirty: false,
      touched: false,
    },
  }))
);
