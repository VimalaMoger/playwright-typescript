import {test, expect, Locator} from '@playwright/test';

test("Single Select Drop down", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/books");

    // Locate the dropdown element
    await page.locator("//select[@id='products-orderby']").selectOption({index:2});
    await page.waitForTimeout(5000);

    const numOfOptions : Locator = page.locator("//select[@id='products-orderby']/option");
    await expect(numOfOptions).toHaveCount(6);
    const options : string[] = (await numOfOptions.allTextContents()).map( option => option.trim());
    
    expect(options).toContain('Position');

    for (const option of [... options.sort()]) {
        console.log(option);
    }
});