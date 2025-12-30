import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'get-started',
    loadComponent: () =>
      import('./pages/intro/intro.page').then((m) => m.IntroPage),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.page').then((m) => m.MainPage),
  },
];
