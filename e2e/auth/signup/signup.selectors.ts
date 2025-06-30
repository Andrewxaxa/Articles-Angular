import { Page } from '@playwright/test';

export const signupPage = (page: Page) => ({
  username: () => page.getByTestId('username').locator('input'),
  email: () => page.getByTestId('email').locator('input'),
  password: () => page.getByTestId('password').locator('input'),
  signupButton: () => page.getByTestId('signup-button').locator('button'),
});
