import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { UserFormModule } from '../user-form/user-form.module';
import { Route, RouterModule } from '@angular/router';

export const createUserRoutes: Route[] = [
  {
    path: '',
    component: CreateUserComponent,
  },
];

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    UserFormModule,
    RouterModule.forChild(createUserRoutes),
  ],
})
export class CreateUserModule {}
