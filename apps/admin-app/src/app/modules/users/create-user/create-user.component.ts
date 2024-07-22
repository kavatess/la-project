import { Component, ViewChild } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.routes';
import { UsersRoutes } from '../users.constants';
import { User } from '@libs/models';

@Component({
  selector: 'la-project-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  @ViewChild(UserFormComponent)
  userFormComp: UserFormComponent;

  constructor(
    private readonly service: UsersService,
    private readonly router: Router
  ) {}

  createUser() {
    if (this.userFormComp.form.invalid) return;

    this.service
      .createUser(this.userFormComp.form.value as User)
      .subscribe((user) => {
        if (!user) return;
        this.router.navigate([
          AppRoutes.Users,
          UsersRoutes.Update,
          user.id || null,
        ]);
      });
  }
}
