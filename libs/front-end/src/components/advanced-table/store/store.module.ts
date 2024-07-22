import { createFeature } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tableReducer, TableState } from './table.reducer';
import { TableEffects } from './table.effects';

export const TABLE_STORE_NAME = 'table';

export const tableStoreFeature = createFeature({
  name: TABLE_STORE_NAME,
  reducer: tableReducer,
});

export const tableFeatureSelector =
  createFeatureSelector<TableState>(TABLE_STORE_NAME);

@NgModule({
  imports: [
    StoreModule.forFeature(tableStoreFeature),
    EffectsModule.forFeature(TableEffects),
  ],
})
export class TableStoreModule {}
