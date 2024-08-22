import { Route } from '@angular/router';
import { <%= className %>sComponent } from './<%= name %>s.component';

export enum <%= className %>sRoutes {
  Create = 'create',
  Update = 'update',
}

export const <%= name %>sRoutes: Route[] = [
  {
    path: '',
    component: <%= className %>sComponent,
  },
  {
    path: <%= className %>sRoutes.Create,
    loadChildren: () =>
      import('./create-<%= name %>/create-<%= name %>.module').then(
        (m) => m.Create<%= className %>Module
      ),
  },
  {
    path: `${<%= className %>sRoutes.Update}/:<%= name %>Id`,
    loadChildren: () =>
      import('./update-<%= name %>/update-<%= name %>.module').then(
        (m) => m.Update<%= className %>Module
      ),
  },
];
