import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '@libs/front-end';
import {
  User,
  UserGenders,
  UserProperties,
  userRoleList,
  UserRoles,
  UserStatuses,
} from '@libs/models';

@Component({
  selector: 'la-project-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends AbstractFormComponent<User> {
  readonly UserProperties = UserProperties;
  readonly UserStatuses = UserStatuses;
  readonly UserGenders = UserGenders;
  readonly userRoleList = userRoleList;

  readonly form = this.fb.group({
    [UserProperties.portrait]: [null, []],
    [UserProperties.firstName]: [null, [Validators.required]],
    [UserProperties.lastName]: [null, [Validators.required]],
    [UserProperties.dob]: [null, []],
    [UserProperties.sex]: [UserGenders.Male, []],
    [UserProperties.address]: [null, []],
    [UserProperties.phone]: [null, [Validators.required]],
    [UserProperties.email]: [null, [Validators.required]],
    [UserProperties.role]: [UserRoles.Admin, [Validators.required]],
    [UserProperties.note]: [null, []],
    [UserProperties.status]: [UserStatuses.Active, [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {
    super();
  }
}
