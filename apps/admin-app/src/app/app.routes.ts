import { Route } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export enum AppRoutes {
  Login = 'login',
  Shows = 'shows',
  Payments = 'payments',
  Blogs = 'blogs',
  Users = 'users',
  Profile = 'profile',
  Orders = 'orders',
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
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.Payments,
    loadChildren: () =>
      import('./modules/payments/payments.module').then(
        (mod) => mod.PaymentsModule
      ),
  },
  {
    path: AppRoutes.Orders,
    loadChildren: () =>
      import('./modules/orders/orders.module').then(
        (mod) => mod.OrdersModule
      ),
  },
  // {
  //   path: AppRoutes.Blogs,
  //   loadChildren: () =>
  //     import('./modules/blogs/blogs.module').then((mod) => mod.BlogsModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: AppRoutes.Users,
    loadChildren: () =>
      import('./modules/users/users.module').then((mod) => mod.UsersModule),
    canActivate: [AuthGuard],
  },
];
