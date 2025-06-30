import { test, expect } from '@playwright/test';
import { toastSuccess } from './../../ui/forms/forms.selectors';
import {
  loginSecondaryTestUser,
  loginTestUser,
} from './../../auth/auth.helper';
import { articleDetailsPage } from './article-details.selectors';
import { testArticle } from './article-details.helper';
import { pageLoader } from '../../ui/loading-page/loading-page.selectors';
import {
  addArticle,
  newArticleFormData,
} from '../add-article/add-article.helper';

test.describe('Article Details Page', () => {
  let articleDetails: ReturnType<typeof articleDetailsPage>;

  test.beforeEach(async ({ page }) => {
    await page.goto(`/articles/${testArticle.id}`);
    articleDetails = articleDetailsPage(page);
  });

  test('should display page loader', async ({ page }) => {
    await expect(pageLoader(page)).toBeVisible();
  });

  test('should display title', async () => {
    await expect(articleDetails.title()).toBeVisible();
    await expect(articleDetails.title()).toContainText(testArticle.title);
  });

  test('should display created at date', async () => {
    await expect(articleDetails.createdAt()).toBeVisible();
    await expect(articleDetails.createdAt()).toContainText(
      testArticle.createdAtFormatted
    );
  });

  test('should display updated at date', async () => {
    await expect(articleDetails.updatedAt()).toBeVisible();
  });

  test('should display article image', async () => {
    await expect(articleDetails.image()).toBeVisible();
    await expect(articleDetails.image()).toHaveAttribute(
      'src',
      testArticle.cdnUrl
    );
  });

  test('should display summary', async () => {
    await expect(articleDetails.summary()).toBeVisible();
    await expect(articleDetails.summary()).toContainText(testArticle.summary);
  });

  test('should display content', async () => {
    await expect(articleDetails.content()).toBeVisible();
    await expect(articleDetails.content()).toContainText(testArticle.content);
  });

  test('should display card actions only if user is creator', async ({
    page,
  }) => {
    await expect(articleDetails.loggedInActions()).not.toBeVisible();

    await loginTestUser(page);
    await page.goto(`/articles/${testArticle.id}`);

    await expect(articleDetails.loggedInActions()).toBeVisible();
  });

  test('should NOT display card actions only if user is NOT creator', async ({
    page,
  }) => {
    await expect(articleDetails.loggedInActions()).not.toBeVisible();

    await loginSecondaryTestUser(page);
    await page.goto(`/articles/${testArticle.id}`);

    await expect(articleDetails.loggedInActions()).not.toBeVisible();
  });

  test('should navigate to edit page when edit button is clicked', async ({
    page,
  }) => {
    await loginTestUser(page);
    await page.goto(`/articles/${testArticle.id}`);

    await expect(articleDetails.editButton()).toBeVisible();

    await articleDetails.editButton().click();

    await expect(page).toHaveURL(`/articles/${testArticle.id}/edit`);
  });

  test('should delete article', async ({ page }) => {
    await loginTestUser(page);
    await page.goto('/articles/new');

    await addArticle(page);

    const addSuccessToast = toastSuccess(page);
    await expect(addSuccessToast).toBeVisible();
    await expect(addSuccessToast).toContainText('New article added');
    await addSuccessToast.click();

    const card = page.locator('mat-card', {
      hasText: newArticleFormData.title,
    });
    await expect(card).toBeVisible();

    await expect(card.getByRole('button', { name: 'Read more' })).toBeVisible();

    await Promise.all([
      page.waitForURL('**/articles/**'),
      card.getByRole('button', { name: 'Read more' }).click(),
    ]);

    const url = page.url();
    const id = url.split('/articles/')[1];

    await page.waitForURL(`/articles/${id}`);
    await expect(page).toHaveURL(`/articles/${id}`);

    const articleDetails = articleDetailsPage(page);

    await expect(articleDetails.title()).toBeVisible();
    await expect(articleDetails.title()).toContainText(
      newArticleFormData.title
    );
    await expect(articleDetails.loggedInActions()).toBeVisible();

    const deleteButton = articleDetails.deleteButton();
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    await expect(articleDetails.deleteConfirmTitle()).toBeVisible();
    await expect(articleDetails.deleteConfirmText()).toBeVisible();
    await articleDetails.deleteConfirmButton().click();
    await expect(toastSuccess(page)).toBeVisible();
    await expect(toastSuccess(page)).toContainText('Article deleted');

    await expect(page).toHaveURL('/articles');
  });
});
