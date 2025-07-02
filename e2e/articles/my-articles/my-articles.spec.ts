import {
  loginSecondaryTestUser,
  loginTestUser,
} from './../../auth/auth.helper';
import { test, expect } from '@playwright/test';
import { myArticlesPage } from './my-articles.selectors';
import { pageLoader } from '../../ui/loading-page/loading-page.selectors';
import { emptyPage } from '../../ui/empty-page/empty-page.selectors';

test.describe('My Articles List', () => {
  let myArticles: ReturnType<typeof myArticlesPage>;
  const myArticlesRoute = '/my-articles';

  test.beforeEach(async ({ page }) => {
    myArticles = myArticlesPage(page);
  });

  test('should redirect to login page if user if not logged in', async ({
    page,
  }) => {
    await page.goto(myArticlesRoute);
    await expect(page.url()).toMatch('/login');
  });

  test('should show loading spinner', async ({ page }) => {
    await loginTestUser(page);
    await page.goto(myArticlesRoute);

    await expect(pageLoader(page)).toBeVisible();
  });

  test('sould render list of articles if logged in user is a creator', async ({
    page,
  }) => {
    await loginTestUser(page);
    await page.goto(myArticlesRoute);

    await expect(myArticles.articlesGrid()).toBeVisible();
    const count = await myArticles.articleCard().count();

    await expect(count).toBeGreaterThan(1);
  });

  test('should render empty page if logged in user is not a creator', async ({
    page,
  }) => {
    await loginSecondaryTestUser(page);
    await page.goto(myArticlesRoute);

    await expect(emptyPage(page)).toBeVisible();
  });
});
