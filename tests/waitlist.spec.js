const { test, expect } = require('@playwright/test');

const baseURL = process.env.BASE_URL || 'http://localhost:8080/';

test('submitting the waitlist shows the Hooray confirmation', async ({ page }) => {
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (error) => {
    pageErrors.push(String(error));
  });

  await page.goto(baseURL);
  await page.locator('#name').fill('Jordan Lee');
  await page.locator('#email-address').fill('jordan@example.com');
  await page.locator('#submit-btn').click();

  await expect(page.getByText('Hooray!')).toBeVisible();
  expect(consoleErrors, `console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
  expect(pageErrors, `page errors:\n${pageErrors.join('\n')}`).toEqual([]);
});
