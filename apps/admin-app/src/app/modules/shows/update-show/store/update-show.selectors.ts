import { createSelector } from '@ngrx/store';
import { updateShowFeatureSelector } from './store.module';

export const showFormSelector = createSelector(
  updateShowFeatureSelector,
  (state) => state.showForm
);
export const showFormSelectors = {
  data: createSelector(showFormSelector, (state) => state.data),
  valid: createSelector(showFormSelector, (state) => state.valid),
  pristine: createSelector(showFormSelector, (state) => state.pristine),
  dirty: createSelector(showFormSelector, (state) => state.dirty),
  touched: createSelector(showFormSelector, (state) => state.touched),
};
