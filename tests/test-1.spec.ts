import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.locator('.checkselect-over').first().click();
  await page.getByText('Affiliate').click();
  await page.locator('.checkselect-over').first().click();
  await page.locator('div:nth-child(2) > .input-item > .checkselect > .checkselect-control > .checkselect-over').click();
  await page.getByText('Выбрать все').nth(1).click();
  await page.locator('.checkselect-control.active > .checkselect-over').click();
  await page.locator('.radio__square').first().click();
  await page.locator('div:nth-child(2) > .radio > .radio__square').first().click();
  await page.locator('label:nth-child(3) > .radio__square').first().click();
  await page.getByRole('button', { name: 'Сгенерировать превью' }).click();
});