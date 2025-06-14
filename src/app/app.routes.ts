import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Articles } from './articles/articles';
import { NotFound } from './not-found/not-found';
import { ROUTES_CONFIG } from './routes.config';

export const routes: Routes = [
  {
    path: ROUTES_CONFIG.HOME.path,
    component: Home,
    title: ROUTES_CONFIG.HOME.title,
  },
  {
    path: ROUTES_CONFIG.ARTICLES.path,
    component: Articles,
    title: ROUTES_CONFIG.ARTICLES.title,
  },
  { path: '**', component: NotFound },
];
