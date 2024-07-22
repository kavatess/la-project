import { Component, OnInit, ViewChild } from '@angular/core';
import { FormState, User } from '@libs/models';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'la-project-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  formState: FormState<User> = null;

  @ViewChild(UserFormComponent)
  userFormComp: UserFormComponent;

  constructor(
    private readonly service: UsersService,
    private readonly router: ActivatedRoute
  ) {}

  get userId(): string {
    return this.router.snapshot.paramMap.get('userId');
  }

  get userName(): string {
    const { fullName, firstName, lastName } = this.formState.data;
    return fullName || `${lastName} ${firstName}`;
  }

  ngOnInit(): void {
    this.service.getUserById(this.userId).subscribe((data) => {
      this.formState = {
        data,
        pristine: true,
        touched: false,
      };
    });
  }

  updateUser() {
    if (this.userFormComp.form.invalid) return;
    this.service
      .updateUser(this.userId, this.userFormComp.form.value as User)
      .subscribe((updatedUser) => {
        if (!updatedUser) return;
        this.formState = {
          data: updatedUser,
          pristine: true,
          touched: false,
        };
      });
  }
}
