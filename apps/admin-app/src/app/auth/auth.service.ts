import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { OperatorFunction, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '@libs/models';
import { LOCAL_STORAGE_KEYS } from '../modules/app.constants';
import { AppRoutes } from '../app.routes';

interface LoginResponse {
  token: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_REQUEST_ROUTE = '';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly localStorage: LocalStorageService
  ) {}

  public isLoggedIn(): boolean {
    return !!this.getAuthToken() && !!this.getUserInfo();
  }

  public getAuthToken(): string | null {
    return this.localStorage.retrieve(LOCAL_STORAGE_KEYS.TOKEN);
  }

  public getUserInfo(): User | null {
    return this.localStorage.retrieve(LOCAL_STORAGE_KEYS.USER);
  }

  public login(loginInfo: { accountName: string; password: string }) {
    return this.http.post(this.AUTH_REQUEST_ROUTE + '/login', loginInfo).pipe(
      tap((authInfo) => this.storeAuthInfo(authInfo as LoginResponse)),
      map(() => true),
      this.handleAuthReqError()
    );
  }

  public updateUserInfo(user: User) {
    this.http.post(this.AUTH_REQUEST_ROUTE + '/user/update', user).pipe(
      map(() => true),
      this.handleAuthReqError()
    );
  }

  public changePassword(newPasswordInfo: {
    phoneNumber: string;
    oldPassword: string;
    newPassword: string;
  }) {
    return this.http
      .post(this.AUTH_REQUEST_ROUTE + '/password/update', newPasswordInfo)
      .pipe(
        tap(() => this.logout()),
        map(() => true),
        this.handleAuthReqError()
      );
  }

  public logout() {
    this.clearAuthInfo();
    this.router.navigate([AppRoutes.Login]);
  }

  private handleAuthReqError() {
    return catchError((err) => {
      console.error(err);
      return of(false);
    }) as OperatorFunction<boolean, boolean>;
  }

  private storeAuthInfo({ token, userId }: LoginResponse) {
    this.localStorage.store(LOCAL_STORAGE_KEYS.TOKEN, token);
    this.localStorage.store(LOCAL_STORAGE_KEYS.USER, userId);
  }

  private clearAuthInfo() {
    this.localStorage.clear(LOCAL_STORAGE_KEYS.TOKEN);
    this.localStorage.clear(LOCAL_STORAGE_KEYS.USER);
  }
}
