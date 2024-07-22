/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { EnvironmentProperties } from '@libs/models';
import { LOCAL_STORAGE_KEYS } from '../modules/app.constants';
import { AppRoutes } from '../app.routes';
import { environment } from '../../environments/environment';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE_URL = `${
    environment[EnvironmentProperties.apiUrl]
  }/auth`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly localStorage: LocalStorageService
  ) {}

  public isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  public getAuthToken(): string | null {
    return this.localStorage.retrieve(LOCAL_STORAGE_KEYS.TOKEN);
  }

  public login(loginInfo: { accountName: string; password: string }) {
    return this.http.post(`${this.API_BASE_URL}/login`, loginInfo).pipe(
      tap((authInfo) => this.storeAuthInfo(authInfo as LoginResponse)),
      map(() => true)
    );
  }

  public logout() {
    this.clearAuthInfo();
    this.router.navigate([AppRoutes.Login]);
  }

  private storeAuthInfo({ access_token }: LoginResponse) {
    this.localStorage.store(LOCAL_STORAGE_KEYS.TOKEN, access_token);
  }

  private clearAuthInfo() {
    this.localStorage.clear(LOCAL_STORAGE_KEYS.TOKEN);
    this.localStorage.clear(LOCAL_STORAGE_KEYS.USER);
  }
}
