import { Page } from 'playwright/test';

export const emptyPage = (page: Page) => page.getByTestId('empty-page');
