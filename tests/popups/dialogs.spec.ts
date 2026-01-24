import { test, expect } from '@playwright/test';

test('dialogs handling', async ({ page }) => {
  // Navigate to the page that triggers dialogs
  await page.goto('https://resplendent-pony-e08064.netlify.app/');

  // Go to second page
  page.locator("//a[text()='2']").click();

  page.on('dialog', (dialog) => {

    console.log("Dialog type is:", dialog.type());
    expect(dialog.type()).toBe('alert');
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toContain('Hi, I was clicked');
    dialog.accept();
  });

  await page.locator("//a[normalize-space()='Click Me']").click();
  await page.waitForTimeout(5000);

});