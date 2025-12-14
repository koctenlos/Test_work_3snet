import { test, expect } from '@playwright/test';

test.describe('Events widget', () => {

  test('test iframe', async ({ page }) => {
    // Открываем страницу
    await page.goto('https://dev.3snet.info/eventswidget/');

    // Проверяем, что iframe с виджетом появился
    const codeBlock=page.locator('textarea#code');
    await expect(codeBlock).toContainText('iframe');
    await expect(codeBlock).toContainText('frameborder');
    await expect(codeBlock).toContainText('turquoise');

    //Проверяем, что ввод текста в iframe заблокирован
    await expect(codeBlock).toBeDisabled
  });
});

test('test button', async ({ page }) => {
    // Открываем страницу
    await page.goto('https://dev.3snet.info/eventswidget/');

  //Проверяем, что после нажатия на кнопку "Скопировать код" текст внутри изменяется на "Скопировано"
    const copybutton=page.locator('#code-copy-button');
    await expect(copybutton).toBeVisible();
    await copybutton.click();
    await expect(copybutton).toHaveText('Скопировано');
    await expect(copybutton).toHaveText('Скопировать код',{timeout:5000});


});

// iframe код обновляется когда цвет изменён
test('change color', async ({ page }) => {
    // Открываем страницу
    await page.goto('https://dev.3snet.info/eventswidget/');

    const colorbutton=page.locator('div:nth-child(2) > label:nth-child(3) > .radio__square');
    const codeBlock=page.locator('textarea#code');
    await colorbutton.click();
    await expect(codeBlock).toContainText('purple');
});

// создание календаря
test('create calendar', async ({ page }) => {
    // Открываем страницу
    await page.goto('https://dev.3snet.info/eventswidget/');

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
  const previewframe=page.frameLocator('#3snet-frame');
  await expect(previewframe.getByText('Название события')).toBeVisible();
  await expect(previewframe.getByText('Дата проведения' )).toBeVisible();
  await expect(previewframe.getByText('Страны проведения')).toBeVisible();
});