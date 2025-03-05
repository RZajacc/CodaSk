import {test, expect} from '@playwright/test';

test('should navigate to questions page', async ({page}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');

  // Find an element with the text 'About' and click on it
  await page.click('text=Search by questions');

  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL('/search/questions');
});
