import { Page } from '@playwright/test';

export const formFieldError = (page: Page, testId: string) =>
  page.getByTestId(testId).locator('mat-error');

export const toastSuccess = (page: Page) => page.locator('.toast-success');
export const toastError = (page: Page) => page.locator('.toast-error');
export const toastWarning = (page: Page) => page.locator('.toast-warning');
