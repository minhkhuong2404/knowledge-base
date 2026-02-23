import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'learn/fundamentals/getting-started', pathMatch: 'full' },
  {
    path: 'learn/:category/:topic',
    loadComponent: () => import('./components/layout/layout').then(m => m.Layout),
  },
  { path: '**', redirectTo: 'learn/fundamentals/getting-started' },
];
