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
    path: ROUTES_CONFIG.ADD_ARTICLE.path,
    loadComponent: () =>
      import('./articles/add-article/add-article').then((m) => m.AddArticle),
    title: ROUTES_CONFIG.ADD_ARTICLE.title,
  },
  {
    path: ROUTES_CONFIG.ARTICLES_DETAILS.path,
    loadComponent: () =>
      import('./articles/article-details-page/article-details-page').then(
        (m) => m.ArticleDetailsPage
      ),
    title: ROUTES_CONFIG.ARTICLES_DETAILS.title,
  },
  {
    path: ROUTES_CONFIG.EDIT_ARTICLE.path,
    loadComponent: () =>
      import('./articles/edit-article-page/edit-article-page').then(
        (m) => m.EditArticlePage
      ),
    title: ROUTES_CONFIG.EDIT_ARTICLE.title,
  },
  {
    path: ROUTES_CONFIG.ARTICLES.path,
    component: ArticlesPage,
    title: ROUTES_CONFIG.ARTICLES.title,
  },
  { path: '**', component: NotFound },
];
