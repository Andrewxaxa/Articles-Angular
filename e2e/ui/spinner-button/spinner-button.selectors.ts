import { Page } from '@playwright/test';

export const spinnerInButton = (page: Page) =>
  page.getByTestId('spinner-in-button');
