import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'category/:id',
    loadComponent: () => import('./pages/category/category').then((m) => m.CategoryComponent),
  },
  {
    path: 'topic/:id',
    loadComponent: () => import('./pages/topic-detail/topic-detail').then((m) => m.TopicDetail),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-results/search-results').then((m) => m.SearchResults),
  },
  { path: '**', redirectTo: '' },
];
