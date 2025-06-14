interface IRoutesConfig {
  HOME: IRouteConfig;
  ARTICLES: IRouteConfig;
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
};
