import { test, expect } from '@playwright/test';

test.describe('Events widget', () => {

  test('Widget loads and displays events list', async ({ page }) => {
    // Открываем страницу
    await page.goto('https://dev.3snet.info/eventswidget/');

    // Проверяем, что iframe с виджетом появился
    const codeBlock=page.locator('textarea#code');
    await expect(codeBlock).toContainText('iframe');
    await expect(codeBlock).toContainText('frameborder');
    await expect(codeBlock).toContainText('turquoise');

    //Проверяем, что после нажатия на кнопку "Скопировать код" текст внутри изменяется на "Скопировано"
    const copybutton=page.locator('#code-copy-button');
    await expect(copybutton).toBeVisible();
    await copybutton.click();
    await expect(copybutton).toHaveText('Скопировано');
    await expect(copybutton).toHaveText('Скопировать код',{timeout:5000});
    
  });

});
