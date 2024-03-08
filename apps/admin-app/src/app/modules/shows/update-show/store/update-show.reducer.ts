/* eslint-disable @typescript-eslint/no-empty-interface */
import { createReducer, on } from '@ngrx/store';
import { showFormActions } from './update-show.actions';
import { Show, FormState, Section, FareType } from '@libs/models';

export interface ShowFormState extends FormState<Show> {}
export interface FareTypeFormState extends FormState<FareType> {}

export interface UpdateShowState {
  loading: boolean;
  showId: string;
  showForm: ShowFormState;
  seatMap: {
    sections: Section[];
    selectedSection: Section;
  };
  fareTypes: {
    data: FareType[];
    fareTypeForm: FareTypeFormState;
  };
}

const initialState: UpdateShowState = {
  loading: false,
  showId: null,
  showForm: {
    data: null,
    valid: true,
    pristine: true,
    dirty: false,
    touched: false,
  },
  seatMap: {
    sections: [],
    selectedSection: null,
  },
  fareTypes: {
    data: [],
    fareTypeForm: null,
  },
};

export const updateShowReducer = createReducer(
  initialState,
  on(showFormActions.fetchShowId, (state, { showId }) => ({
    ...state,
    showId,
  })),
  on(showFormActions.loadShowData, (state, { data }) => ({
    ...state,
    showForm: {
      data,
      valid: true,
      pristine: true,
      dirty: false,
      touched: false,
    },
  })),
  on(showFormActions.fetchShowForm, (state, { formState }) => ({
    ...state,
    showForm: formState,
  })),
  on(showFormActions.loadSectionList, (state, { data }) => ({
    ...state,
    seatMap: {
      ...state.seatMap,
      sections: data,
      selectedSection: data[0] || state.seatMap?.sections[0],
    },
  })),
  on(showFormActions.loadSelectedSection, (state, { data }) => ({
    ...state,
    seatMap: {
      ...state.seatMap,
      selectedSection: data,
    },
  })),
  on(showFormActions.loadFareTypes, (state, { data }) => ({
    ...state,
    fareTypes: {
      ...state.fareTypes,
      data,
    },
  }))
  //   on(updateShowActions.resetScore, (state) => ({ home: 0, away: 0 })),
  //   on(updateShowActions.setScores, (state, { game }) => ({
  //     home: game.home,
  //     away: game.away,
  //   }))
);
