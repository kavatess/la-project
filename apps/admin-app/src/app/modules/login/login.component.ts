import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'la-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public readonly loginForm: FormGroup = new FormGroup({
    accountName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(11),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(256),
    ]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['farm']);
        } else {
          alert('Đăng nhập thất bại. Xin vui lòng thử lại.');
        }
      });
    }
  }
}
