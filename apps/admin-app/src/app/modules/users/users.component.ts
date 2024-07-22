import { Component, OnInit } from '@angular/core';
import { User, UserStatuses } from '@libs/models';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { UsersRoutes } from './users.constants';

@Component({
  selector: 'la-project-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  readonly UserStatuses = UserStatuses;

  userList: User[] = [];

  constructor(
    private readonly service: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.userList = data;
    });
  }

  onUserClick(userId: string): void {
    this.router.navigate([AppRoutes.Users, UsersRoutes.Update, userId || null]);
  }

  createBtnOnClick(): void {
    this.router.navigate([AppRoutes.Users, UsersRoutes.Create]);
  }
}
