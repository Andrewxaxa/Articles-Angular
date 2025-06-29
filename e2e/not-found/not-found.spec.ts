import { test, expect } from '@playwright/test';
import { notFoundPage } from './not-found.selectors';

test.describe('NotFound component', () => {
  let notFound: ReturnType<typeof notFoundPage>;

  test.beforeEach(async ({ page }) => {
    await page.goto('/404');
    notFound = notFoundPage(page);
  });

  test('should display the error icon and 404 text', async () => {
    await expect(notFound.icon()).toHaveText('error');
    await expect(notFound.header()).toHaveText('404');
  });

  test('should display "Page not found" message', async () => {
    await expect(notFound.text()).toHaveText('Page not found');
  });

  test('should have a "Back to home page" button', async () => {
    await expect(notFound.backButton()).toBeVisible();
  });

  test('should navigate to home page when button is clicked', async ({
    page,
  }) => {
    await notFound.backButton().click();

    await expect(page).toHaveURL('/');
  });
});
