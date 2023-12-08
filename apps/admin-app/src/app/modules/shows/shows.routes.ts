import { Route } from '@angular/router';
import { ShowsComponent } from './shows.component';
import { ShowsRoutes } from './shows.constants';

export const showsRoutes: Route[] = [
  {
    path: '',
    component: ShowsComponent,
  },
  {
    path: ShowsRoutes.Create,
    loadChildren: () =>
      import('./create-show/create-show.module').then(
        (mod) => mod.CreateShowModule
      ),
  },
  {
    path: `${ShowsRoutes.Update}/:showId`,
    loadChildren: () =>
      import('./update-show/update-show.module').then(
        (mod) => mod.UpdateShowModule
      ),
  },
];
