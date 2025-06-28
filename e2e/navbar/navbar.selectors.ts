import { Page } from 'playwright/test';

export const navbarPage = (page: Page) => ({
  logoutButton: () => page.getByTestId('logout'),
});
