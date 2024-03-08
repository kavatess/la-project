import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowFormComponent } from './show-form/show-form.component';
import { SeatMapComponent } from './seat-map/seat-map.component';
import {
  NgbModalModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BlockDetailModalComponent } from './seat-map/block-detail-modal/block-detail-modal.component';
import { FareTypesTableComponent } from './fare-types-table/fare-types-table.component';
import { FareTypeFormComponent } from './fare-types-table/fare-type-form/fare-type-form.component';

@NgModule({
  declarations: [
    ShowFormComponent,
    SeatMapComponent,
    BlockDetailModalComponent,
    FareTypesTableComponent,
    FareTypeFormComponent,
  ],
  imports: [
    CommonModule,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSlideToggleModule,
    NgbTimepickerModule,
    NgbModalModule,
  ],
  exports: [ShowFormComponent, SeatMapComponent, FareTypesTableComponent],
})
export class ShowInfoModule {}
