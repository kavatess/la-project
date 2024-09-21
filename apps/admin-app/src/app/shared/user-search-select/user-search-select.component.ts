/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchSelectModule } from '@libs/front-end';
import { UsersService } from '../../modules/users/users.service';
import { User } from '@libs/models';

@Component({
  selector: 'la-project-user-search-select',
  standalone: true,
  imports: [CommonModule, SearchSelectModule],
  templateUrl: './user-search-select.component.html',
  styleUrls: ['./user-search-select.component.scss'],
  providers: [UsersService],
})
export class UserSearchSelectComponent {
  @Input()
  multiple = false;

  constructor(private readonly userService: UsersService) {}

  findUser = (userIds: string[]) => this.userService.getData();

  searchUserByTxt = (txt: string) => this.userService.getData();

  displayUser(user: User): string {
    return user?.fullName || `${user?.lastName} ${user?.firstName}`;
  }
}
