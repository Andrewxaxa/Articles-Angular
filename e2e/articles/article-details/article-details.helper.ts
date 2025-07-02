import { expect, Page } from '@playwright/test';
import { articleDetailsPage } from './article-details.selectors';

export const deleteArticle = async (
  page: Page,
  title: string
): Promise<void> => {
  const card = page.locator('mat-card', {
    hasText: title,
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

  const articleDetails = articleDetailsPage(page);

  const deleteButton = articleDetails.deleteButton();
  await deleteButton.click();

  await articleDetails.deleteConfirmButton().click();
};
