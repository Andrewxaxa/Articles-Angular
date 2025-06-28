import { test, expect } from '@playwright/test';
import { navbarPage } from './navbar.selectors';
import { loginTestUser } from '../auth/auth.helper';

test.describe('Navbar', () => {
  let navbar: ReturnType<typeof navbarPage>;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    navbar = navbarPage(page);
  });

  test('should display all navigation links', async ({ page }) => {
    const navLinks = [
      'nav-home',
      'nav-articles',
      'nav-add-article',
      'nav-my-articles',
      'nav-categories',
    ];

    for (let i = 0; i < navLinks.length; i++) {
      await expect(page.getByTestId(navLinks[i])).toBeVisible();
    }
  });

  test('should show login and signup when user is not logged in', async () => {
    await expect(navbar.loginButton()).toBeVisible();
    await expect(navbar.signupButton()).toBeVisible();
    await expect(navbar.logoutButton()).not.toBeVisible();
  });

  test('should show logout when user in logged in', async ({ page }) => {
    await loginTestUser(page);

    await expect(navbar.logoutButton()).toBeVisible();
    await expect(navbar.loginButton()).not.toBeVisible();
    await expect(navbar.signupButton()).not.toBeVisible();
  });
});
