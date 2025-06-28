import { Page } from 'playwright/test';

export const navbarPage = (page: Page) => ({
  loginButton: () => page.getByTestId('login'),
  signupButton: () => page.getByTestId('signup'),
  logoutButton: () => page.getByTestId('logout'),
});
