import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleSelectComponent } from './multiple-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [MultipleSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgbDropdownModule,
  ],
  exports: [MultipleSelectComponent],
})
export class MultipleSelectModule {}
