import {test, expect, Locator} from '@playwright/test';

test("Verify Playwright dynamic XPath Locators", async ({page}) => {

  test.setTimeout(120000); // 2 minutes
  await page.goto('https://resplendent-pony-e08064.netlify.app/page2');

  // dynamic xpath
  for(let i = 1; i <= 5; i++) { 
    const id = "before";
    let button: Locator = page.locator('//button[contains(@id, "${id}")]').or(page.locator(`#${id}`));
    await button.click();
    await page.waitForTimeout(2000);
  }

  // using css dynamic locator
  const id = "after";
  let button = page.locator('#after').or(page.locator(`#${id}`));
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