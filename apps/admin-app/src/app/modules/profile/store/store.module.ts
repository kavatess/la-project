import { createFeature } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileState, profileReducer } from './profile.reducer';
import { PROFILE_STORE_NAME } from '../profile.constants';
import { ProfileService } from './profile.service';
import { ProfileEffects } from './profile.effects';

export const profileFeature = createFeature({
  name: PROFILE_STORE_NAME,
  reducer: profileReducer,
});

export const profileFeatureSelector =
  createFeatureSelector<ProfileState>(PROFILE_STORE_NAME);

@NgModule({
  imports: [
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature(ProfileEffects),
  ],
  providers: [ProfileService],
})
export class profileStoreModule {}
