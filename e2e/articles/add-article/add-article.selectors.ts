import { Page } from 'playwright/test';
import { newArticleFormData } from './add-article.helper';

export const addArticlePage = (page: Page) => ({
  pickerHeader: () => page.getByTestId('picker-header'),
  uploadFileButton: () => page.getByText('Upload file'),
  uploadDoneButton: () => page.getByRole('button', { name: 'Done' }),
  form: () => page.getByTestId('form'),
  category: () => page.getByTestId('category'),
  categoryOption: () =>
    page.locator(`mat-option:has-text("${newArticleFormData.category}")`),
  title: () => page.getByTestId('title').locator('input'),
  summary: () => page.getByTestId('summary').locator('textarea'),
  content: () => page.getByTestId('content').locator('textarea'),
  submitButton: () => page.getByTestId('submit-button').locator('button'),
});
