import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UpdateShowComponent } from './update-show.component';
import { ShowInfoModule } from '../show-info/show-info.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateShowStoreModule } from './store/store.module';

export const updateShowRoutes: Route[] = [
  {
    path: '',
    component: UpdateShowComponent,
  },
];

@NgModule({
  declarations: [UpdateShowComponent],
  imports: [
    CommonModule,
    NgbNavModule,
    ShowInfoModule,
    UpdateShowStoreModule,
    RouterModule.forChild(updateShowRoutes),
  ],
})
export class UpdateShowModule {}
