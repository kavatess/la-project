import { createFeature } from '@ngrx/store';
import { UpdateShowState, updateShowReducer } from './update-show.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { UPDATE_SHOW_STORE_NAME } from '../update-show.constants';
import { EffectsModule } from '@ngrx/effects';
import { UpdateShowEffects } from './update-show.effects';
import { UpdateShowService } from './update-show.service';

export const updateShowFeature = createFeature({
  name: UPDATE_SHOW_STORE_NAME,
  reducer: updateShowReducer,
});

export const updateShowFeatureSelector = createFeatureSelector<UpdateShowState>(
  UPDATE_SHOW_STORE_NAME
);

@NgModule({
  imports: [
    StoreModule.forFeature(updateShowFeature),
    EffectsModule.forFeature(UpdateShowEffects),
  ],
  providers: [UpdateShowService],
})
export class UpdateShowStoreModule {}
