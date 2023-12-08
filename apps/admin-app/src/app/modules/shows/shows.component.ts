import { Component, OnInit } from '@angular/core';
import { ShowsService } from './shows.service';
import { Show } from 'libs/models/src/show';
import { Router } from '@angular/router';
import { ShowsRoutes } from './shows.constants';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'la-project-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit {
  showList: Show[] = [];

  constructor(
    private readonly showService: ShowsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.showList = this.showService.getShowList();
  }

  headerTitleOnClick(show: Show): void {
    this.router.navigate([
      AppRoutes.Shows,
      ShowsRoutes.Update,
      show.id || 'null',
    ]);
  }

  createBtnOnClick(): void {
    this.router.navigate([AppRoutes.Shows, ShowsRoutes.Create]);
  }
}
