/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { EnvironmentProperties, User } from '@libs/models';
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
  @Inject(EnvironmentProperties.apiUrl) API_BASE_URL = '';

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

  public getUserInfo(): User {
    return this.localStorage.retrieve(LOCAL_STORAGE_KEYS.USER);
  }

  public login(loginInfo: { accountName: string; password: string }) {
    return this.http.post(this.API_BASE_URL + '/auth/login', loginInfo).pipe(
      tap((authInfo) => this.storeAuthInfo(authInfo as LoginResponse)),
      map(() => true)
    );
  }

  public logout() {
    this.clearAuthInfo();
    this.router.navigate([AppRoutes.Login]);
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
