import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Show } from 'libs/models/src/show';
import { ShowFormState } from './update-show.reducer';
import { Section } from '@libs/models';

// Form Actions
export const showFormActions = createActionGroup({
  source: '[shows/update:show-form]',
  events: {
    getShowById: props<{ showId: string }>(),
    loadShowData: props<{ data: Show }>(),
    loadShowDataError: props<{ error: Error }>(),
    fetchShowForm: props<{ formState: ShowFormState }>(),
    getSection: emptyProps(),
    loadSelectedSection: props<{ data: Partial<Section> }>(),
    loadSelectedSectionError: props<{ error: Error }>(),
    changeSection: props<{ sectionId: string }>(),
    updateSelectedSection: props<{ data: any }>(),
    createSection: props<{ data: any }>(),
  },
});
