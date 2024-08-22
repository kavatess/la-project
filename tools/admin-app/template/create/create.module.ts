import { NgModule } from '@angular/core';
import { Create<%= className %>Component } from './create-<%= name %>.component';
import { CommonModule } from '@angular/common';
import { <%= className %>FormModule } from '../<%= name %>-form/<%= name %>-form.module';
import { Route, RouterModule } from '@angular/router';

export const create<%= className %>Routes: Route[] = [
  {
    path: '',
    component: Create<%= className %>Component,
  },
];

@NgModule({
  declarations: [Create<%= className %>Component],
  imports: [
    CommonModule,
    <%= className %>FormModule,
    RouterModule.forChild(create<%= className %>Routes),
  ],
  exports: [Create<%= className %>Component],
})
export class Create<%= className %>Module {}
