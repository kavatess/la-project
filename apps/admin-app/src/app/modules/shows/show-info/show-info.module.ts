import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ShowInfoComponent } from './show-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FareTypesComponent } from './fare-types/fare-types.component';
import { ShowFormComponent } from './show-form/show-form.component';
import { SeatMapComponent } from './seat-map/seat-map.component';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ShowInfoComponent,
    FareTypesComponent,
    ShowFormComponent,
    SeatMapComponent,
  ],
  imports: [
    CommonModule,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSlideToggleModule,
    NgbTimepickerModule,
  ],
  exports: [
    ShowInfoComponent,
    FareTypesComponent,
    ShowFormComponent,
    SeatMapComponent,
  ],
})
export class ShowInfoModule {}
