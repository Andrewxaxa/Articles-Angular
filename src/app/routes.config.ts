interface IRoutesConfig {
  HOME: IRouteConfig;
  LOGIN: IRouteConfig;
  SIGNUP: IRouteConfig;
  ARTICLES: IRouteConfig;
  ARTICLES_DETAILS: IRouteConfig;
  ADD_ARTICLE: IRouteConfig;
  EDIT_ARTICLE: IRouteConfig;
  MY_ARTICLES: IRouteConfig;
  CAGORIES: IRouteConfig;
  CATEGORY_ARTICLES: IRouteConfig;
}

interface IRouteConfig {
  name: string;
  path: string;
  title: string;
}

export const ROUTES_CONFIG: IRoutesConfig = {
  HOME: {
    name: 'Home',
    path: '',
    title: 'Home Page',
  },
  LOGIN: {
    name: 'Log in',
    path: 'login',
    title: 'Log in',
  },
  SIGNUP: {
    name: 'Sign up',
    path: 'signup',
    title: 'Sign up',
  },
  ARTICLES: {
    name: 'Articles',
    path: 'articles',
    title: 'Articles',
  },
  ARTICLES_DETAILS: {
    name: 'Article details',
    path: 'articles/:id',
    title: 'Article details',
  },
  EDIT_ARTICLE: {
    name: 'Edit article',
    path: 'articles/:id/edit',
    title: 'Edit article',
  },
  ADD_ARTICLE: {
    name: 'Add article',
    path: 'articles/new',
    title: 'Add article',
  },
  MY_ARTICLES: {
    name: 'My articles',
    path: 'my-articles',
    title: 'My articles',
  },
  CATEGORY_ARTICLES: {
    name: 'Category articles',
    path: 'categories/:name',
    title: 'Category articles',
  },
  CAGORIES: {
    name: 'Categories',
    path: 'categories',
    title: 'Article categories',
  },
};
