import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSelectComponent } from './search-select.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchSelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
  exports: [SearchSelectComponent],
})
export class SearchSelectModule {}
