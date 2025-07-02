import { Page } from 'playwright/test';

export const myArticlesPage = (page: Page) => ({
  articlesGrid: () => page.getByTestId('articles-grid'),
  articleCard: () => page.getByTestId('article-card'),
});
