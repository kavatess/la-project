import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './update-user.component';
import { Route, RouterModule } from '@angular/router';
import { UserFormModule } from '../user-form/user-form.module';

const updateUserRoutes: Route[] = [
  {
    path: '',
    component: UpdateUserComponent,
  },
];

@NgModule({
  declarations: [UpdateUserComponent],
  imports: [
    CommonModule,
    UserFormModule,
    RouterModule.forChild(updateUserRoutes),
  ],
})
export class UpdateUserModule {}
