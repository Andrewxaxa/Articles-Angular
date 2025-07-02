import { test, expect } from '@playwright/test';
import { articlesSearchpage } from './articles-search-list.selectors';
import { pageLoader } from '../../ui/loading-page/loading-page.selectors';
import { testArticle } from '../articles.helper';

test.describe('Articles Search List', () => {
  let articlesSearch: ReturnType<typeof articlesSearchpage>;

  test.beforeEach(async ({ page }) => {
    await page.goto('/articles');
    articlesSearch = articlesSearchpage(page);
  });

  test('should display page loader', async ({ page }) => {
    await expect(pageLoader(page)).toBeVisible();
  });

  test('should display search field', async () => {
    const searchField = articlesSearch.searchField();

    await expect(searchField).toBeVisible();
    await expect(searchField.locator('label')).toContainText('Search articles');
  });

  test('should render list of articles', async () => {
    await expect(articlesSearch.articlesGrid()).toBeVisible();
    const count = await articlesSearch.articleCard().count();

    await expect(count).toBeGreaterThan(1);
  });

  test('each article card should contain title, image, summary and button', async () => {
    const count = await articlesSearch.articleCard().count();

    for (let i = 0; i < count; i++) {
      const card = articlesSearch.articleCard().nth(i);

      await expect(card.locator(articlesSearch.title())).toBeVisible();
      await expect(card.locator(articlesSearch.image())).toBeVisible();
      await expect(card.locator(articlesSearch.summary())).toBeVisible();
      await expect(card.locator(articlesSearch.readMoreButton())).toBeVisible();
    }
  });

  test('should navigate to article detail page when "Read more" is clicked', async ({
    page,
  }) => {
    const card = articlesSearch.articleCard().first();

    const readMoreButton = card.locator(articlesSearch.readMoreButton());
    await readMoreButton.click();

    await page.waitForURL('**/articles/**');
    const url = page.url();

    await expect(url).toMatch(/\/articles\/.+/);
  });

  test('should filter articles and clear input', async () => {
    const searchFieldInput = articlesSearch.searchFieldInput();
    await searchFieldInput.fill(testArticle.title);

    const count = await articlesSearch.articleCard().count();
    await expect(count).toBe(1);

    await expect(articlesSearch.searchFieldClear()).toBeVisible();

    await articlesSearch.searchFieldClear().click();

    await expect(searchFieldInput).toBeEmpty();
  });
});
