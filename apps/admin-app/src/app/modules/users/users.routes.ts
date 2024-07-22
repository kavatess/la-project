import { Route } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersRoutes } from './users.constants';

export const usersRoutes: Route[] = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: UsersRoutes.Create,
    loadChildren: () =>
      import('./create-user/create-user.module').then(
        (m) => m.CreateUserModule
      ),
  },
  {
    path: `${UsersRoutes.Update}/:userId`,
    loadChildren: () =>
      import('./update-user/update-user.module').then(
        (m) => m.UpdateUserModule
      ),
  },
];
