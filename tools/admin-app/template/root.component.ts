import { Component, OnInit } from '@angular/core';
import { <%= className %>, <%= className %>Properties, <%= className %>Statuses } from '@libs/models';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { FilterTypes, TableColumn, TableService } from '@libs/front-end';
import { <%= className %>sService } from './<%= name %>s.service';
import { <%= className %>sRoutes } from './<%= name %>s.routes';

@Component({
  selector: 'la-project-<%= name %>s',
  templateUrl: './<%= name %>s.component.html',
  styleUrls: ['./<%= name %>s.component.scss'],
})
export class <%= className %>sComponent implements OnInit {
  readonly <%= className %>Properties = <%= className %>Properties;
  readonly <%= className %>Statuses = <%= className %>Statuses;

  columns: TableColumn[] = [
    {
      field: <%= className %>Properties.<%= props[0] %>,
      title: '<%= props[0] %>',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: <%= className %>Properties.<%= props[1] %>,
      title: '<%= props[1] %>',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
    {
      field: <%= className %>Properties.<%= props[2] %>,
      title: '<%= props[2] %>',
      filter: {
        type: FilterTypes.String,
      },
      sorting: true,
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly tableService: TableService,
    private readonly <%= name %>Service: <%= className %>sService
  ) {}

  ngOnInit(): void {
    this.tableService.replaceService(this.<%= name %>Service);
  }

  <%= name %>ItemOnClick(<%= name %>: <%= className %>): void {
    this.router.navigate([
      AppRoutes.<%= className %>s,
      <%= className %>sRoutes.Update,
      <%= name %>.id || null,
    ]);
  }

  createBtnOnClick(): void {
    this.router.navigate([AppRoutes.<%= className %>s, <%= className %>sRoutes.Create]);
  }
}
