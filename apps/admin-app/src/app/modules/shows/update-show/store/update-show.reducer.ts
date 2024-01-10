/* eslint-disable @typescript-eslint/no-empty-interface */
import { createReducer, on } from '@ngrx/store';
import { showFormActions } from './update-show.actions';
import { Show, FormState, Section } from '@libs/models';

export interface ShowFormState extends FormState<Show> {}

export interface UpdateShowState {
  showForm: ShowFormState;
  seatMap: {
    sections: Section[];
    selectedSectionId: string;
    selectedSection: Section;
  };
}

const initialState: UpdateShowState = {
  showForm: {
    data: null,
    valid: true,
    pristine: true,
    dirty: false,
    touched: false,
  },
  seatMap: {
    sections: [],
    selectedSectionId: null,
    selectedSection: null,
  },
};

export const updateShowReducer = createReducer(
  initialState,
  on(showFormActions.loadShowData, (state, { data }) => ({
    ...state,
    showForm: {
      data,
      valid: true,
      pristine: true,
      dirty: false,
      touched: false,
    },
    seatMap: {
      sections: data?.sections || [],
      selectedSectionId: data?.sections?.[0]?.id || null,
      selectedSection: data?.sections?.[0] || null,
    },
  })),
  on(showFormActions.fetchShowForm, (state, { formState }) => ({
    ...state,
    showForm: formState,
  })),
  on(showFormActions.loadSelectedSection, (state, { data }) => ({
    ...state,
    seatMap: {
      ...state.seatMap,
      selectedSection: data,
    },
  })),
  on(showFormActions.changeSection, (state, { sectionId }) => ({
    ...state,
    seatMap: {
      ...state.seatMap,
      selectedSectionId: sectionId,
    },
  }))
  //   on(updateShowActions.resetScore, (state) => ({ home: 0, away: 0 })),
  //   on(updateShowActions.setScores, (state, { game }) => ({
  //     home: game.home,
  //     away: game.away,
  //   }))
);
