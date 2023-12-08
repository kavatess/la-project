import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, RouterModule.forChild(usersRoutes)],
})
export class UsersModule {}
