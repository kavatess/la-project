import { Route } from '@angular/router';

export enum AppRoutes {
  Login = 'login',
  Shows = 'shows',
  Blogs = 'blogs',
  Users = 'users',
}

export const appRoutes: Route[] = [
  {
    path: AppRoutes.Login,
    loadChildren: () =>
      import('./modules/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: AppRoutes.Shows,
    loadChildren: () =>
      import('./modules/shows/shows.module').then((mod) => mod.ShowsModule),
  },
  {
    path: AppRoutes.Blogs,
    loadChildren: () =>
      import('./modules/blogs/blogs.module').then((mod) => mod.BlogsModule),
  },
  {
    path: AppRoutes.Users,
    loadChildren: () =>
      import('./modules/users/users.component').then(
        (mod) => mod.UsersComponent
      ),
  },
];
