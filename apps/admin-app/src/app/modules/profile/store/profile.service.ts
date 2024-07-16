import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EnvironmentProperties, User } from '@libs/models';
import { ProfileFormState } from './profile.reducer';
import { AuthService } from '../../../auth/auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  @Inject(EnvironmentProperties.apiUrl) readonly API_BASE_URL!: string;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getProfile() {
    return this.http.get<User>(this.API_BASE_URL + '/auth/profile');
  }

  updateProfile(newProfile: ProfileFormState) {
    return this.http.patch<User>(
      this.API_BASE_URL + '/auth/profile',
      newProfile
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http
      .post<User>(this.API_BASE_URL + '/auth/change-password', {
        oldPassword,
        newPassword,
      })
      .pipe(tap(() => this.authService.logout()));
  }
}
