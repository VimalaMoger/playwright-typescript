import {test, expect, Locator} from '@playwright/test';

test("Verify Playwright dynamic XPath Locators", async ({page}) => {
    await page.goto('https://glowing-scone-599a90.netlify.app/');

  // dynamic xpath
  for(let i = 1; i <= 5; i++) {
    let button: Locator = page.locator('//button[@id="btn" or @id="btn"]');
    await button.click();
    await page.waitForTimeout(2000);
  }

  // using css dynamic locator
  let button = page.locator('button[id="btn"], button[id="btn"]');
  for(let i = 1; i<=5; i++) {
    await button.click();
    await page.waitForTimeout(2000);
  }

  // playwright specific locators
  for(let i = 1; i <= 5; i++) {
    const button = page.getByRole('button', {name: 'Add item from First'}).or(page.getByRole('button', {name: 'Add item from Last'}));
    //const button = page.getByRole('button', {name: /Add item from First|Add item from Last/ });
    await button.click();
    await page.waitForTimeout(2000);
  } 
})