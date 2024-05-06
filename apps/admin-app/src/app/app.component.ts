import { Component, OnInit } from '@angular/core';
import { AppRoutes } from './app.routes';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'la-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly title = 'admin-app';
  readonly AppRoutes = AppRoutes;

  constructor(
    readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([AppRoutes.Shows]);
    } else {
      this.authService.logout();
    }
  }
}
