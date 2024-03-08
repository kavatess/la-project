import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Show } from 'libs/models/src/show';
import { ShowFormState } from './update-show.reducer';
import { FareType, Section } from '@libs/models';

// Form Actions
export const showFormActions = createActionGroup({
  source: 'shows/update',
  events: {
    fetchShowId: props<{ showId: string }>(),
    getShowData: emptyProps(),
    loadShowData: props<{ data: Show }>(),
    loadShowDataError: props<{ error: Error }>(),
    fetchShowForm: props<{ formState: ShowFormState }>(),
    updateShow: emptyProps(),
    getShowSectionList: emptyProps(),
    loadSectionList: props<{ data: Section[] }>(),
    loadSectionListError: props<{ error: Error }>(),
    getSelectedSection: emptyProps(),
    loadSelectedSection: props<{ data: Section }>(),
    loadSelectedSectionError: props<{ error: Error }>(),
    changeSection: props<{ sectionId: string }>(),
    updateSelectedSection: props<{ data: any }>(),
    createSection: props<{ data: any }>(),
    getShowFareTypes: emptyProps(),
    loadFareTypes: props<{ data: FareType[] }>(),
    loadFareTypesError: props<{ error: Error }>(),
  },
});
