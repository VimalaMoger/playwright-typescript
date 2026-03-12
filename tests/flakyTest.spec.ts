import { test, expect } from '@playwright/test';


test('Nested Shadow Dom', async({page, context}) => {

    context.tracing.start({screenshots: true, snapshots: true});
    await page.goto('https://shop.polymer-project.org/');

    await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();

    await page.waitForTimeout(5000);

    const productsFound = await page.locator('div.title').all();
    expect(productsFound.length).toBe(16);

    context.tracing.stop({path: 'trace-nested-shadow-dom.zip'});
    await page.waitForTimeout(5000);
});