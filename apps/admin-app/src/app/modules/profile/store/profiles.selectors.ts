import { createSelector } from '@ngrx/store';
import { profileFeatureSelector } from './store.module';

export const profileFormSelector = createSelector(
  profileFeatureSelector,
  (state) => state.profileForm
);
