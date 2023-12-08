import { createActionGroup, props } from '@ngrx/store';
import { Show } from 'libs/models/src/show';
import { ShowFormState } from './update-show.reducer';

// Form Actions
export const showFormActions = createActionGroup({
  source: '[shows/update:show-form]',
  events: {
    getShowDataById: props<{ showId: string }>(),
    loadData: props<{ data: Show }>(),
    loadDataError: props<{ error: Error }>(),
    saveData: props<{ formState: ShowFormState }>(),
  },
});
