import { Page } from 'playwright/test';

export const loginPage = (page: Page) => ({
  email: () => page.getByTestId('email').locator('input'),
  password: () => page.getByTestId('password').locator('input'),
  loginButton: () => page.getByTestId('login-button'),
});
