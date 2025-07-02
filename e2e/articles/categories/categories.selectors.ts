import { Page } from 'playwright/test';

export const categoriesPage = (page: Page) => ({
  cardsContainer: () => page.getByTestId('cards-container'),
  categoryCards: () => page.getByTestId('category-card'),
  categoryImage: () => page.getByTestId('category-image'),
  categoryTitle: () => page.getByTestId('category-title'),
  categoryWithName: (name: string) =>
    page.locator('[data-testid="category-card"]', {
      has: page.locator('[data-testid="category-title"]', { hasText: name }),
    }),
  backButton: () => page.getByTestId('back-button'),
  articlesCategoryTitle: () => page.getByTestId('articles-category-title'),
  articlesGrid: () => page.getByTestId('articles-grid'),
  articleCard: () => page.getByTestId('article-card'),
});
