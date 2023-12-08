import { Component, OnInit } from '@angular/core';
import { AppRoutes } from './app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'la-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly title = 'admin-app';
  readonly AppRoutes = AppRoutes;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.navigate([AppRoutes.Shows]);
  }
}
