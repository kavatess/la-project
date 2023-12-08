import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateShowComponent } from './create-show.component';
import { ShowInfoModule } from '../show-info/show-info.module';

export const createShowRoutes: Route[] = [
  {
    path: '',
    component: CreateShowComponent,
  },
];

@NgModule({
  declarations: [CreateShowComponent],
  imports: [
    CommonModule,
    ShowInfoModule,
    RouterModule.forChild(createShowRoutes),
  ],
})
export class CreateShowModule {}
