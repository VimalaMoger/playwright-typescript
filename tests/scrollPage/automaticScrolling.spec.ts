import {test, expect} from '@playwright/test';

test('Scrolling to footer', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/');

    const ScrolltoFooter = page.locator('//a[@href="/customer/addresses"]');
    console.log("Scrolling to footer");
});

test('Scrolling inside dropdown', async ({page}) => {
    await page.goto('https://resplendent-pony-e08064.netlify.app/page3');
    await page.locator(".dropdown").hover();
    const option = page.locator('body div a:nth-child(10)');
    const selectedColor = await option.innerText()
    console.log("Option captured: " , selectedColor);  


    page.on('dialog', (dialog) => {
        console.log("Dialog type is:", dialog.type());
        expect(dialog.type()).toBe('alert');
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toContain("You selected: " + selectedColor);
        dialog.accept();
    });
    await option.click();
});

test.only('Scrolling inside the table', async ({page}) => {
    await page.goto('https://datatables.net/examples/basic_init/scroll_xy.html');
    
    const lastName = await page.locator("//td[text()='Stevens']").innerText();
    console.log("Scrolling to last name Stevens", lastName);
});