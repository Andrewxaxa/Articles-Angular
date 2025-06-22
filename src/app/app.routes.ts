import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ArticlesPage } from './articles/components/articles-page/articles-page';
import { NotFound } from './not-found/not-found';
import { ROUTES_CONFIG } from './routes.config';
import { Login } from './auth/login/login';
import { authGuard } from './auth/guards/auth-guard';
import { guestGuard } from './auth/guards/guest-guard';

export const routes: Routes = [
  {
    path: ROUTES_CONFIG.HOME.path,
    component: Home,
    title: ROUTES_CONFIG.HOME.title,
  },
  {
    path: ROUTES_CONFIG.LOGIN.path,
    component: Login,
    title: ROUTES_CONFIG.LOGIN.title,
    canActivate: [guestGuard],
  },
  {
    path: ROUTES_CONFIG.SIGNUP.path,
    loadComponent: () => import('./auth/signup/signup').then((m) => m.Signup),
    title: ROUTES_CONFIG.SIGNUP.title,
    canActivate: [guestGuard],
  },
  {
    path: ROUTES_CONFIG.ADD_ARTICLE.path,
    loadComponent: () =>
      import('./articles/components/add-article/add-article').then(
        (m) => m.AddArticle
      ),
    title: ROUTES_CONFIG.ADD_ARTICLE.title,
    canActivate: [authGuard],
  },
  {
    path: ROUTES_CONFIG.ARTICLES_DETAILS.path,
    loadComponent: () =>
      import(
        './articles/components/article-details-page/article-details-page'
      ).then((m) => m.ArticleDetailsPage),
    title: ROUTES_CONFIG.ARTICLES_DETAILS.title,
  },
  {
    path: ROUTES_CONFIG.EDIT_ARTICLE.path,
    loadComponent: () =>
      import('./articles/components/edit-article-page/edit-article-page').then(
        (m) => m.EditArticlePage
      ),
    title: ROUTES_CONFIG.EDIT_ARTICLE.title,
    canActivate: [authGuard],
  },
  {
    path: ROUTES_CONFIG.ARTICLES.path,
    component: ArticlesPage,
    title: ROUTES_CONFIG.ARTICLES.title,
  },
  {
    path: ROUTES_CONFIG.MY_ARTICLES.path,
    loadComponent: () =>
      import('./articles/components/my-articles-page/my-articles-page').then(
        (m) => m.MyArticlesPage
      ),
    title: ROUTES_CONFIG.MY_ARTICLES.title,
    canActivate: [authGuard],
  },
  {
    path: ROUTES_CONFIG.CATEGORY_ARTICLES.path,
    loadComponent: () =>
      import(
        './articles/components/category-articles-page/category-articles-page'
      ).then((m) => m.CategoryArticlesPage),
    title: ROUTES_CONFIG.CATEGORY_ARTICLES.title,
  },
  {
    path: ROUTES_CONFIG.CAGORIES.path,
    loadComponent: () =>
      import('./articles/components/categories/categories').then(
        (m) => m.CategoriesPage
      ),
    title: ROUTES_CONFIG.CAGORIES.title,
  },
  { path: '**', component: NotFound },
];
