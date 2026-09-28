import { test, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UI_URL = 'http://localhost:5173';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.beforeEach('should allow user to signin', async ({ page }) => {
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

  await page.goto(`${UI_URL}/add-hotel`);

});

test('should allow user to create hotel', async ({page}) => {
   await page.locator("[name=name]").fill("Sogo test");
   await page.locator('[name=city]').fill("Caloocan test");
   await page.locator("[name=country]").fill("Philippines test");
   await page.locator("[name=description]").fill("TEST_Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce massa enim, pretium id tempus vitae, hendrerit sit amet felis. Sed pharetra accumsan urna, nec blandit turpis elementum eu. Nulla accumsan vitae massa vitae ornare. Integer mattis tincidunt lacus, quis aliquam orci tempor a._TEST");
   await page.locator("[name=price]").fill("1500");

   await page.selectOption('select[name="starRating"]', '3');

   await page.getByText("Luxury").click();

   await page.getByLabel("Spa").click();
   await page.getByLabel("Parking").click();

   await page.locator("[name=adultCount]").fill("3");

   await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', 'shoes.jpg'),
    path.join(__dirname, 'files', 'suits.jpg'),
    path.join(__dirname, "files", "tshirts.jpg")
   ]);

   await page.getByRole("button", {name: "Save"}).click();

   await expect(page.getByText("Added a hotel")).toBeVisible();
})