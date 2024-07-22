import { createSelector } from '@ngrx/store';
import { tableFeatureSelector } from './store.module';

export const tableSelectors = {
  loading: createSelector(tableFeatureSelector, (state) => state.loading),
  pageIndex: createSelector(
    tableFeatureSelector,
    (state) => state.pagination.pageIndex
  ),
  columns: createSelector(tableFeatureSelector, (state) => state.columns),
  data: createSelector(tableFeatureSelector, (state) => state.data),
  filter: createSelector(tableFeatureSelector, (state) => state.filter),
  sorting: createSelector(tableFeatureSelector, (state) => state.sorting),
  pagination: createSelector(tableFeatureSelector, (state) => state.pagination),
};
