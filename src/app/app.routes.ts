import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ArticlesPage } from './articles/articles-page/articles-page';
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
    component: ArticlesPage,
    title: ROUTES_CONFIG.ARTICLES.title,
  },
  {
    path: ROUTES_CONFIG.ARTICLES_DETAILS.path,
    loadComponent: () =>
      import('./articles/article-details-page/article-details-page').then(
        (m) => m.ArticleDetailsPage
      ),
    title: ROUTES_CONFIG.ARTICLES_DETAILS.title,
  },
  { path: '**', component: NotFound },
];
