

2. Отмечу, что при использовании кода:
  const copybutton=page.getByRole('button', {name:'Скопировать код'});
    await expect(copybutton).toBeVisible();
    await copybutton.click();
    await expect (copybutton).toContainText('Скопировано')

тест заваливался, так как происходило слишком долгое ожидание, в ходе которого кнопка изменяла текст с "Скопировано" обратно на "Скопировать код".

Позже выяснилось, что искать надо не по "name:'Скопировать код'", а через locator('#code-copy-button'), так как после нажатия на кнопку имя изменялось.


