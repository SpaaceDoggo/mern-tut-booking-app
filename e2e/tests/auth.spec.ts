import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should allow user to signin', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('link', {name: 'Sign in'}).click();

  await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();

  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.getByText('Successfuly login')).toBeVisible();
  await expect(page.getByRole('button', {name: "Logout"})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();

});

test('should allow user to register', async ({page}) => {
  const emailTest = 'test_email' + Math.floor(Math.random() * 9000) + 10000 + '@test.com';
  
  await page.goto(UI_URL);
  
  await page.getByRole('link', {name: 'Sign up'}).click();

  await expect(page.getByRole('heading', {name: 'Create an Account'})).toBeVisible();

  await page.locator('[name=firstName]').fill('test1234');
  await page.locator('[name=lastName]').fill('testlastname');
  await page.locator('[name=email]').fill(emailTest);
  await page.locator('[name=password]').fill('password');
  await page.locator('[name=confirmPassword]').fill('password');

  await page.getByRole('button', {name: "Create Account"}).click();

  await expect(page.getByText('Registration successfull')).toBeVisible();
  await expect(page.getByRole('link', {name: "My Hotel"})).toBeVisible();
  await expect(page.getByRole('button', {name: "Logout"})).toBeVisible();
});