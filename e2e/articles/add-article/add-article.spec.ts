import { test, expect } from '@playwright/test';
import { addArticlePage } from './add-article.selectors';
import { loginTestUser } from '../../auth/auth.helper';
import {
  formFieldError,
  toastSuccess,
  toastWarning,
} from '../../ui/forms/forms.selectors';
import {
  interceptUploadcareBaseQequest,
  interceptUploadcateInfoRequest,
  newArticleFormData,
} from './add-article.helper';

test.describe('Add Article Page', () => {
  let addArticle: ReturnType<typeof addArticlePage>;

  test.beforeEach(async ({ page }) => {
    await loginTestUser(page);
    page.goto('/articles/new');
    addArticle = addArticlePage(page);
  });

  test('should display picker header', async () => {
    await expect(addArticle.pickerHeader()).toBeVisible();
    await expect(addArticle.pickerHeader()).toContainText('Article image:');
  });

  test('should display upload file button', async () => {
    await expect(addArticle.uploadFileButton()).toBeVisible();
  });

  test('should add new article if all fields are valid', async ({ page }) => {
    await interceptUploadcareBaseQequest(page);
    await interceptUploadcateInfoRequest(page);

    const fileChooserPromise = page.waitForEvent('filechooser');
    await addArticle.uploadFileButton().click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('e2e/assets/test-image.jpg');
    await addArticle.uploadDoneButton().click();

    await addArticle.category().click();
    const categoryOption = await addArticle.categoryOption();
    await expect(categoryOption).toBeVisible();
    await categoryOption.click();

    await addArticle.title().fill(newArticleFormData.title);
    await addArticle.summary().fill(newArticleFormData.summary);
    await addArticle.content().fill(newArticleFormData.content);

    await addArticle.submitButton().click();

    await expect(page).toHaveURL('/articles');
    await expect(toastSuccess(page)).toBeVisible();
    await expect(toastSuccess(page)).toContainText('New article added');

    const titleLocator = page
      .getByTestId('title')
      .filter({ hasText: newArticleFormData.title });
    await expect(titleLocator).toBeVisible();
  });

  test('should not submit and show error toast if image is not attached', async ({
    page,
  }) => {
    await addArticle.category().click();
    await page.waitForTimeout(100);
    await addArticle.category().click();

    const categoryOption = await addArticle.categoryOption();
    await expect(categoryOption).toBeVisible();
    await categoryOption.click();

    await addArticle.title().fill(newArticleFormData.title);
    await addArticle.summary().fill(newArticleFormData.summary);
    await addArticle.content().fill(newArticleFormData.content);

    await addArticle.submitButton().click();

    await expect(toastWarning(page)).toBeVisible();
    await expect(toastWarning(page)).toContainText(
      'Please upload image for your article'
    );
  });

  test('should show error messages when form fields are empty', async ({
    page,
  }) => {
    await addArticle.submitButton().click();

    await expect(formFieldError(page, 'category')).toHaveText(
      'Category is required'
    );
    await expect(formFieldError(page, 'title')).toHaveText('Title is required');
    await expect(formFieldError(page, 'summary')).toHaveText(
      'Summary is required'
    );
    await expect(formFieldError(page, 'content')).toHaveText(
      'Content is required'
    );
  });

  test('should show error messages when some form fields are too short', async ({
    page,
  }) => {
    await addArticle.category().click();
    await page.waitForTimeout(100);
    await addArticle.category().click();

    const categoryOption = await addArticle.categoryOption();
    await expect(categoryOption).toBeVisible();
    await categoryOption.click();

    await addArticle.title().fill('test');
    await addArticle.summary().fill('test');
    await addArticle.content().fill('test');

    await addArticle.submitButton().click();

    await expect(formFieldError(page, 'title')).toHaveText(
      'Title is too short'
    );
    await expect(formFieldError(page, 'summary')).toHaveText(
      'Summary is too short'
    );
    await expect(formFieldError(page, 'content')).toHaveText(
      'Content is too short'
    );
  });
});
