import {test,expect} from '@playwright/test';


test('Shadow Dom', async({page}) => {
    await page.goto('https://books-pwakit.appspot.com/');

    await page.locator("#input").fill("Playwright automation");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(5000);

    const booksFound = await page.locator('h2.title').all();
    expect(booksFound.length).toBe(7);
});


test('Nested Shadow Dom', async({page}) => {
    await page.goto('https://shop.polymer-project.org/');

    await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();

    await page.waitForTimeout(5000);

    const productsFound = await page.locator('div.title').all();
    expect(productsFound.length).toBe(16);

    await page.waitForTimeout(5000);
});