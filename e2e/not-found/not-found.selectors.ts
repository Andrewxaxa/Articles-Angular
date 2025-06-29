import { Page } from '@playwright/test';

export const notFoundPage = (page: Page) => ({
  icon: () => page.getByTestId('icon'),
  header: () => page.getByTestId('header'),
  text: () => page.getByTestId('text'),
  backButton: () => page.getByTestId('back-button'),
});
