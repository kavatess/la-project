/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentProperties, User } from '@libs/models';
import { debounceTime, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TableFilter, TableParentService } from '@libs/front-end';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements TableParentService<User> {
  private readonly API_BASE_URL = `${
    environment[EnvironmentProperties.apiUrl]
  }/users`;

  constructor(private readonly http: HttpClient) {}

  getData(filter?: TableFilter): Observable<User[]> {
    return of([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        email: 'a@a.com',
        phone: '111-111-1111',
        role: 'Admin',
        status: 'Active',
      } as User,
    ]).pipe(debounceTime(2000));
  }

  getUserById(userId: string): Observable<User> {
    return of({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'a@a.com',
      phone: '111-111-1111',
      status: 'Active',
    } as User);
  }

  createUser(user: User): Observable<User> {
    return of(user);
  }

  updateUser(userId: string, data: User): Observable<User> {
    return of(data);
  }
}
