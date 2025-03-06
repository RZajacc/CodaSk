import {test, expect} from '@playwright/test';

test.describe('Home page navigation', () => {
  test('should navigate to questions page', async ({page}) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/');

    // Find an element with the text 'About' and click on it
    await page.getByRole('link', {name: 'Search by questions'}).click();

    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL('/search/questions');
  });

  test('should navigate to tags page', async ({page}) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/');

    // Find an element with the text 'About' and click on it
    await page.getByRole('link', {name: 'Search by tags'}).click();

    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL('/search/tags');
  });

  test('should navigate to modules page', async ({page}) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/');

    // Find an element with the text 'About' and click on it
    await page.getByRole('link', {name: 'Search by modules'}).click();

    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL('/search/modules');
  });
});
