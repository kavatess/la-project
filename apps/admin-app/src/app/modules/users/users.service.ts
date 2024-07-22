import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentProperties, User } from '@libs/models';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API_BASE_URL = `${
    environment[EnvironmentProperties.apiUrl]
  }/users`;

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return of([]);
  }

  getUserById(userId: string): Observable<User> {
    return of({} as User);
  }

  createUser(user: User): Observable<User> {
    return of(user);
  }

  updateUser(userId: string, data: User): Observable<User> {
    return of(data);
  }
}
