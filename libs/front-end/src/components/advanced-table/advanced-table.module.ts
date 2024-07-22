import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedTableComponent } from './advanced-table.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MultipleSelectModule } from '../multiple-select/multiple-select.module';
import { TableStoreModule } from './store';

export * from './advanced-table.component';

@NgModule({
  declarations: [AdvancedTableComponent, TableHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableStoreModule,
    NgbDropdownModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MultipleSelectModule,
  ],
  exports: [AdvancedTableComponent],
})
export class AdvancedTableModule {}
