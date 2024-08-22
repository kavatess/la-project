import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { <%= className %>FormComponent } from './<%= name %>-form.component';

@NgModule({
  declarations: [<%= className %>FormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [<%= className %>FormComponent],
})
export class <%= className %>FormModule {}
