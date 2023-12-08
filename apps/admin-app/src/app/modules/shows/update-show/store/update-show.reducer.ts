/* eslint-disable @typescript-eslint/no-empty-interface */
import { createReducer, on } from '@ngrx/store';
import { Show } from 'libs/models';
import { showFormActions } from './update-show.actions';
import { FormState } from '@libs/models';

export interface ShowFormState extends FormState<Show> {}

export interface UpdateShowState {
  showForm: ShowFormState;
}

const initialState: UpdateShowState = {
  showForm: {
    data: null,
    valid: true,
    pristine: true,
    dirty: false,
    touched: false,
  },
};

export const updateShowReducer = createReducer(
  initialState,
  on(showFormActions.loadData, (state, { data }) => ({
    ...state,
    showForm: {
      data,
      valid: true,
      pristine: true,
      dirty: false,
      touched: false,
    },
  })),
  on(showFormActions.saveData, (state, { formState }) => ({
    ...state,
    showForm: formState,
  }))
  //   on(updateShowActions.resetScore, (state) => ({ home: 0, away: 0 })),
  //   on(updateShowActions.setScores, (state, { game }) => ({
  //     home: game.home,
  //     away: game.away,
  //   }))
);
