import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowFormComponent } from './show-form/show-form.component';
import { SeatMapComponent } from './seat-map/seat-map.component';
import {
  NgbDatepickerModule,
  NgbModalModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BlockDetailModalComponent } from './seat-map/block-detail-modal/block-detail-modal.component';
import { FareTypesTableComponent } from './fare-types-table/fare-types-table.component';
import { FareTypeModalComponent } from './fare-types-table/fare-type-modal/fare-type-modal.component';
import { MultipleSelectModule } from '@libs/front-end';

@NgModule({
  declarations: [
    ShowFormComponent,
    SeatMapComponent,
    BlockDetailModalComponent,
    FareTypesTableComponent,
    FareTypeModalComponent,
  ],
  imports: [
    CommonModule,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSlideToggleModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    MultipleSelectModule,
    NgbModalModule,
  ],
  exports: [ShowFormComponent, SeatMapComponent, FareTypesTableComponent],
})
export class ShowInfoModule {}
