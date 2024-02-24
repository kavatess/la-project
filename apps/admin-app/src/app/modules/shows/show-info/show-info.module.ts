import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ShowInfoComponent } from './show-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FareTypesComponent } from './fare-types/fare-types.component';
import { ShowFormComponent } from './show-form/show-form.component';
import { SeatMapComponent } from './seat-map/seat-map.component';
import {
  NgbModalModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BlockDetailModalComponent } from './seat-map/block-detail-modal/block-detail-modal.component';

@NgModule({
  declarations: [
    ShowInfoComponent,
    FareTypesComponent,
    ShowFormComponent,
    SeatMapComponent,
    BlockDetailModalComponent,
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
  exports: [
    ShowInfoComponent,
    FareTypesComponent,
    ShowFormComponent,
    SeatMapComponent,
  ],
})
export class ShowInfoModule {}
