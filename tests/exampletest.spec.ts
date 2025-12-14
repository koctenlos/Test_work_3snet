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