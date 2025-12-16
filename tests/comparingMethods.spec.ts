import {test, Locator, expect } from '@playwright/test';

test("Comparing Methods", async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    const products: Locator = page.locator('.product-title');

    const count = await products.count();


    //textContent() method
    for(let i=0; i< count; i++) {
        console.log((await products.nth(i).textContent())?.trim());
        //or
        //const productName : string | null = await products.nth(i).textContent();
       // console.log(productName? productName.trim() : null);
    }

    //innerText() method
    for(let i=0; i< count; i++) {
        console.log(await products.nth(i).innerText());
    }

    //allInnerTexts() method
    const productNames: string[] = await products.allInnerTexts();
    console.log("AllInnerTexts productNames:", productNames);

    //allTextContents() method trimmed
    const prodNames: (string | null)[] = await products.allTextContents();
    console.log("Before trimming:", prodNames);
    //const trimmedNames = prodNames.map(name => name ? name.trim() : null);
    const trimmedNames = prodNames.map(name => name!.trim());
    console.log("After trimming:", trimmedNames);

    // all()
    // returns array of Locator objects
    const productLocators = await products.all();
    console.log("Using all() method:", productLocators);

    for(const productLocator of productLocators) {
        console.log( await productLocator.innerText());
    }

});