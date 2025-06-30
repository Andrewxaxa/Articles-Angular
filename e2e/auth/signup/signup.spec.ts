import { testUser } from './../auth.helper';
import { test, expect } from '@playwright/test';
import {
  formFieldError,
  toastError,
  toastSuccess,
} from '../../ui/forms/forms.selectors';
import { spinnerInButton } from '../../ui/spinner-button/spinner-button.selectors';
import { signupPage } from './signup.selectors';
import { ISignupPayload } from '../../../src/app/auth/user.interface';

const newUser: ISignupPayload = {
  username: `newuser+${Date.now()}`,
  email: `newuser+${Date.now()}@email.com`,
  password: 'test123',
};

test.describe('Signup Page', () => {
  let signup: ReturnType<typeof signupPage>;

  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
    signup = signupPage(page);
  });

  test('should render signup form inputs and submit button', async () => {
    await expect(signup.username()).toBeVisible();
    await expect(signup.email()).toBeVisible();
    await expect(signup.password()).toBeVisible();
    await expect(signup.signupButton()).toBeVisible();
  });

  test('should show error message when username is empty', async ({ page }) => {
    await signup.signupButton().click();

    await expect(formFieldError(page, 'username')).toHaveText(
      'Username is required'
    );
  });

  test('should show error message when email is empty', async ({ page }) => {
    await signup.signupButton().click();

    await expect(formFieldError(page, 'email')).toHaveText('Email is required');
  });

  test('should show error message when email is incorrect', async ({
    page,
  }) => {
    await signup.email().fill('incorrectValue');
    await signup.email().blur();

    await expect(formFieldError(page, 'email')).toHaveText(
      'Please provide correct email'
    );
  });

  test('should show error message when password is empty', async ({ page }) => {
    await signup.signupButton().click();

    await expect(formFieldError(page, 'password')).toHaveText(
      'Password is required'
    );
  });

  test('should show error message when password is too short', async ({
    page,
  }) => {
    await signup.password().fill('short');
    await signup.password().blur();

    await expect(formFieldError(page, 'password')).toHaveText(
      'Password is too short'
    );
  });

  test('should signup successfully with valid credentials', async ({
    page,
  }) => {
    await signup.username().fill(newUser.username);
    await signup.email().fill(newUser.email);
    await signup.password().fill(newUser.password);

    await signup.signupButton().click();

    await expect(page).toHaveURL('/');
    await expect(toastSuccess(page)).toBeVisible();
    await expect(toastSuccess(page)).toContainText('Signed up');
  });

  test('should display error when email already in use', async ({ page }) => {
    await signup.username().fill(testUser.username);
    await signup.email().fill(testUser.email);
    await signup.password().fill(testUser.password);

    await signup.signupButton().click();

    await expect(toastError(page)).toBeVisible();
  });

  test('should disable button and show spinner when submitting', async ({
    page,
  }) => {
    await signup.username().fill(newUser.username);
    await signup.email().fill(newUser.email);
    await signup.password().fill(newUser.password);

    const signupButton = signup.signupButton();
    await signupButton.click();

    await expect(signupButton).toBeDisabled();
    await expect(spinnerInButton(page)).toBeVisible();
  });
});
