import { Page } from '@playwright/test';

export const pageLoader = (page: Page) => page.getByTestId('page-loader');
