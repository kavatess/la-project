import { Component, OnInit } from '@angular/core';
import { User, UserProperties, UserStatuses } from '@libs/models';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { UsersRoutes } from './users.constants';
import { FilterTypes, TableColumn, TableService } from '@libs/front-end';

@Component({
  selector: 'la-project-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  readonly UserStatuses = UserStatuses;

  readonly columns: TableColumn[] = [
    {
      field: UserProperties.fullName,
      title: 'Name',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: UserProperties.phone,
      title: 'Phone',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: UserProperties.email,
      title: 'Email',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: UserProperties.status,
      title: 'Status',
      filter: {
        type: FilterTypes.Array,
        options: [
          {
            value: UserStatuses.Active,
            title: UserStatuses.Active,
          },
          {
            value: UserStatuses.Inactive,
            title: UserStatuses.Inactive,
          },
        ],
      },
      sorting: true,
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly service: UsersService,
    private readonly tableService: TableService
  ) {}

  ngOnInit(): void {
    this.tableService.replaceService(this.service);
  }

  userOnClick(user: User): void {
    this.router.navigate([
      AppRoutes.Users,
      UsersRoutes.Update,
      user.id || null,
    ]);
  }

  createBtnOnClick(): void {
    this.router.navigate([AppRoutes.Users, UsersRoutes.Create]);
  }
}
