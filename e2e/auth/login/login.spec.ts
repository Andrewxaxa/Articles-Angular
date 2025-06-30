import { testUser } from './../auth.helper';
import { test, expect } from '@playwright/test';
import { loginPage } from './login.selectors';
import {
  formFieldError,
  toastError,
  toastSuccess,
} from '../../ui/forms/forms.selectors';
import { spinnerInButton } from '../../ui/spinner-button/spinner-button.selectors';

test.describe('Login Page', () => {
  let login: ReturnType<typeof loginPage>;

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    login = loginPage(page);
  });

  test('should render login form inputs and submit button', async () => {
    await expect(login.email()).toBeVisible();
    await expect(login.password()).toBeVisible();
    await expect(login.loginButton()).toBeVisible();
  });

  test('should show error message when email is empty', async ({ page }) => {
    await login.loginButton().click();

    await expect(formFieldError(page, 'email')).toHaveText('Email is required');
  });

  test('should show error message when email is incorrect', async ({
    page,
  }) => {
    await login.email().fill('incorrectValue');
    await login.email().blur();

    await expect(formFieldError(page, 'email')).toHaveText(
      'Please provide correct email'
    );
  });

  test('should show error message when password is empty', async ({ page }) => {
    await login.loginButton().click();

    await expect(formFieldError(page, 'password')).toHaveText(
      'Password is required'
    );
  });

  test('should show error message when password is too short', async ({
    page,
  }) => {
    await login.password().fill('short');
    await login.password().blur();

    await expect(formFieldError(page, 'password')).toHaveText(
      'Password is too short'
    );
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await login.email().fill(testUser.email);
    await login.password().fill(testUser.password);
    await login.loginButton().click();

    await expect(page).toHaveURL('/');
    await expect(toastSuccess(page)).toBeVisible();
    await expect(toastSuccess(page)).toContainText('Logged in');
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await login.email().fill('wronguser@example.com');
    await login.password().fill('wrongpass');
    await login.loginButton().click();

    await expect(toastError(page)).toBeVisible();
  });

  test('should disable button and show spinner when submitting', async ({
    page,
  }) => {
    await login.email().fill(testUser.email);
    await login.password().fill(testUser.password);

    const loginButton = login.loginButton();
    await loginButton.click();

    await expect(loginButton).toBeDisabled();
    await expect(spinnerInButton(page)).toBeVisible();
  });
});
