import { test, expect } from '@playwright/test';

test('submits contact form successfully', async ({ page }) => {
  await page.goto('http://localhost:8080/contact');

  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'Hello from the test!');
  await page.check('input[name="disclaimer"]');
  await page.click('button[type="submit"]');

  const status = page.locator('#form-status');
  await expect(status).toBeVisible({ timeout: 10000 });
  await expect(status).toContainText('Message sent', { timeout: 10000 });

  // await expect(page.locator('#form-status')).toContainText('Message sent');
});
