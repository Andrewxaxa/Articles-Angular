interface IRoutesConfig {
  HOME: IRouteConfig;
  ARTICLES: IRouteConfig;
  ARTICLES_DETAILS: IRouteConfig;
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
};
