import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';
import { AdvancedTableModule } from '@libs/front-end';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    AdvancedTableModule,
    RouterModule.forChild(usersRoutes),
  ],
})
export class UsersModule {}
