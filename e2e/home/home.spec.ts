import { test, expect } from '@playwright/test';
import { homePage } from './home.selectors';
import { loginTestUser, testUser } from '../auth/auth.helper';

test.describe('Home Page', () => {
  let home: ReturnType<typeof homePage>;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    home = homePage(page);
  });

  test('should display welcome message for guests', async () => {
    await expect(home.header()).toBeVisible();
    await expect(home.header()).toContainText('Welcome to ArticlesAngular');
  });

  test('should display logo', async () => {
    await expect(home.logo()).toBeVisible();
  });

  test('should display GitHub link', async () => {
    await expect(home.githubLink()).toBeVisible();
    await expect(home.githubLink()).toHaveAttribute(
      'href',
      'https://github.com/Andrewxaxa/Articles-Angular'
    );
  });

  test('should display features list', async () => {
    const features = [
      'User registration and login',
      'Add, edit, and delete articles',
      'Search and filter content',
      'Add images to articles',
      'Responsive, modern interface',
      'Action notifications',
      'Route protection and error handling',
    ];

    const items = await home.featureItems();

    for (let i = 0; i < features.length; ++i)
      await expect(items.nth(i)).toContainText(features[i]);
  });

  test('should display technology list', async () => {
    const technologies = [
      'Angular',
      'Angular Material',
      'Firebase',
      'AngularFire',
      'Uploadcare',
      'SCSS',
      'TypeScript',
      'Signals',
      'RxJS',
      'Playwright',
    ];

    const items = await home.techItems();

    for (let i = 0; i < technologies.length; i++) {
      await expect(items.nth(i)).toContainText(technologies[i]);
    }
  });

  test('should display start card', async () => {
    await expect(home.startCard()).toBeVisible();
  });

  test('should display welcome message for logged in user', async ({
    page,
  }) => {
    await loginTestUser(page);

    await expect(home.header()).toContainText('Welcome,');
    await expect(home.username()).toHaveText(testUser.username);
  });
});
