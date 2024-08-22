import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Update<%= className %>Component } from './update-<%= name %>.component';
import { <%= className %>FormModule } from '../<%= name %>-form/<%= name %>-form.module';
import { Route, RouterModule } from '@angular/router';

export const update<%= className %>Routes: Route[] = [
  {
    path: '',
    component: Update<%= className %>Component,
  },
];

@NgModule({
  declarations: [Update<%= className %>Component],
  imports: [
    CommonModule,
    <%= className %>FormModule,
    RouterModule.forChild(update<%= className %>Routes),
  ],
  exports: [Update<%= className %>Component],
})
export class Update<%= className %>Module {}
