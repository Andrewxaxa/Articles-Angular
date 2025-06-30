import { Page } from '@playwright/test';
import { loginPage } from './login/login.selectors';
import { navbarPage } from '../navbar/navbar.selectors';

export const testUser = {
  email: 'foo@email.com',
  password: 'foofoofoo',
  username: 'foo',
};

export const secondaryTestUser = {
  email: 'bar@email.com',
  password: 'barbarbar',
  username: 'bar',
};

export const loginTestUser = async (page: Page) => {
  const login = loginPage(page);

  await page.goto('/login');
  await login.email().fill(testUser.email);
  await login.password().fill(testUser.password);
  await login.loginButton().click();
  await page.waitForURL('/');
};

export const loginSecondaryTestUser = async (page: Page) => {
  const login = loginPage(page);

  await page.goto('/login');
  await login.email().fill(secondaryTestUser.email);
  await login.password().fill(secondaryTestUser.password);
  await login.loginButton().click();
  await page.waitForURL('/');
};

export const logout = async (page: Page) => {
  const navbar = navbarPage(page);

  await navbar.logoutButton().click({ force: true });
};
