const { test, expect } = require('@playwright/test');

const baseURL = process.env.BASE_URL || 'https://nilpatel-ucb.github.io/SPLUNK-DEMO/';

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
  await page.getByLabel('Full name').fill('Jordan Lee');
  await page.getByLabel('Email').fill('jordan@example.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Hooray!')).toBeVisible();
  expect(consoleErrors, `console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
  expect(pageErrors, `page errors:\n${pageErrors.join('\n')}`).toEqual([]);
});
