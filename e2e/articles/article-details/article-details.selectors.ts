import { Page } from '@playwright/test';

export const articleDetailsPage = (page: Page) => ({
  title: () => page.getByTestId('title'),
  createdAt: () => page.getByTestId('created-at'),
  updatedAt: () => page.getByTestId('updated-at'),
  image: () => page.getByTestId('image'),
  summary: () => page.getByTestId('summary'),
  content: () => page.getByTestId('content'),
  loggedInActions: () => page.getByTestId('logged-in-actions'),
  editButton: () => page.getByTestId('edit-button'),
  deleteButton: () => page.getByTestId('delete-button'),
  deleteConfirmTitle: () => page.getByText('Delete article'),
  deleteConfirmText: () =>
    page.getByText('Do you want to delete this article?'),
  deleteConfirmButton: () => page.getByRole('button', { name: 'Yes' }),
});
