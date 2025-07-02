import { emptyPage } from './../../ui/empty-page/empty-page.selectors';
import { test, expect } from '@playwright/test';
import { categoriesPage } from './categories.selectors';
import { pageLoader } from '../../ui/loading-page/loading-page.selectors';

test.describe('Categories Page', () => {
  let categories: ReturnType<typeof categoriesPage>;

  test.beforeEach(async ({ page }) => {
    page.goto('/categories');
    categories = categoriesPage(page);
  });

  test('should show page loader', async ({ page }) => {
    await expect(pageLoader(page)).toBeVisible();
  });

  test('should show categories', async () => {
    await expect(categories.cardsContainer()).toBeVisible();

    const count = await categories.categoryCards().count();
    await expect(count).toBeGreaterThan(1);
  });

  test('each category card shot contain image and title', async () => {
    await expect(categories.cardsContainer()).toBeVisible();
    const count = await categories.categoryCards().count();

    for (let i = 0; i < count; i++) {
      const card = categories.categoryCards().nth(i);

      await expect(card.locator(categories.categoryImage())).toBeVisible();
      await expect(card.locator(categories.categoryTitle())).toBeVisible();
    }
  });

  test('should navigate to articles with specyfic category and render articles category title and back button', async ({
    page,
  }) => {
    await expect(categories.cardsContainer()).toBeVisible();
    const categoryName = 'Work';

    const categoryCard = await categories.categoryWithName(categoryName);
    await categoryCard.click();

    await expect(page).toHaveURL(`/categories/${categoryName}`);

    const categoryTitle = categories.articlesCategoryTitle();
    await expect(categoryTitle).toBeVisible();
    await expect(categoryTitle).toContainText(categoryName);

    const backButton = categories.backButton();
    await expect(backButton).toBeVisible();
    await expect(backButton).toContainText('Browse categories');
    await backButton.click();
    await expect(page).toHaveURL('/categories');
  });

  test('should navigate to articles with specyfic category and render empty page if no articles belongs to that category', async ({
    page,
  }) => {
    await expect(categories.cardsContainer()).toBeVisible();
    const categoryName = 'Work';

    const categoryCard = await categories.categoryWithName(categoryName);
    await categoryCard.click();

    await expect(page).toHaveURL(`/categories/${categoryName}`);
    await expect(emptyPage(page)).toBeVisible();
  });

  test('should navigate to articles with specyfic category and render category grid if articles belongs to that category', async ({
    page,
  }) => {
    await expect(categories.cardsContainer()).toBeVisible();
    const categoryName = 'Technology';

    const categoryCard = await categories.categoryWithName(categoryName);
    await categoryCard.click();

    await expect(page).toHaveURL(`/categories/${categoryName}`);

    await expect(categories.articlesGrid()).toBeVisible();
    const count = await categories.articleCard().count();
    await expect(count).toBeGreaterThan(1);
  });
});
