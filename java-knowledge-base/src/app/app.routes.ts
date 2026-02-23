import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CategoryComponent } from './pages/category/category';
import { TopicDetail } from './pages/topic-detail/topic-detail';
import { SearchResults } from './pages/search-results/search-results';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'topic/:id', component: TopicDetail },
  { path: 'search', component: SearchResults },
  { path: '**', redirectTo: '' }
];
