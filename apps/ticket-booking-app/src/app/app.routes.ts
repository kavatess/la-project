import { Route } from '@angular/router';

export enum AppRoutes {
  Home = 'home',
  Shows = 'shows',
  Events = 'events',
  Blog = 'blog',
  AboutUs = 'about-us',
}

export const appRoutes: Route[] = [
  {
    path: AppRoutes.Home,
    loadChildren: () =>
      import('./modules/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: AppRoutes.Shows,
    loadChildren: () =>
      import('./modules/shows/shows.module').then((mod) => mod.ShowsModule),
  },
  {
    path: AppRoutes.Blog,
    loadChildren: () =>
      import('./modules/blog/blog.module').then((mod) => mod.BlogModule),
  },
  {
    path: AppRoutes.AboutUs,
    loadChildren: () =>
      import('./modules/about-us/about-us.module').then(
        (mod) => mod.AboutUsModule
      ),
  },
];
