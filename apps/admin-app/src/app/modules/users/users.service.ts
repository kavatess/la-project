import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@libs/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
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

  deleteUser(userId: string) {
    return of({});
  }
}
