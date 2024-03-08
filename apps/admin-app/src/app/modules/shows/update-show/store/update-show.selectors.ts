import { createSelector } from '@ngrx/store';
import { updateShowFeatureSelector } from './store.module';

export const showIdSelector = createSelector(
  updateShowFeatureSelector,
  (state) => state.showId
);

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

export const seatMapSelectors = {
  sections: createSelector(
    updateShowFeatureSelector,
    (state) => state.seatMap?.sections || []
  ),
  selectedSection: createSelector(
    updateShowFeatureSelector,
    (state) => state.seatMap?.selectedSection || null
  ),
};

export const fareTypesSelectors = {
  data: createSelector(
    updateShowFeatureSelector,
    (state) => state.fareTypes?.data || []
  ),
  fareTypeForm: createSelector(
    updateShowFeatureSelector,
    (state) => state.fareTypes?.fareTypeForm || null
  ),
};
