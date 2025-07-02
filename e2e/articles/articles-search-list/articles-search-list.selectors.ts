import { Page } from 'playwright/test';

export const articlesSearchpage = (page: Page) => ({
  searchField: () => page.getByTestId('search-field'),
  searchFieldInput: () => page.getByTestId('search-field').locator('input'),
  searchFieldClear: () =>
    page.getByTestId('search-field').locator(page.getByTestId('clear')),
  articlesGrid: () => page.getByTestId('articles-grid'),
  articleCard: () => page.getByTestId('article-card'),
  title: () => page.getByTestId('title'),
  image: () => page.getByTestId('image'),
  summary: () => page.getByTestId('summary'),
  readMoreButton: () => page.getByTestId('read-more-button'),
});
