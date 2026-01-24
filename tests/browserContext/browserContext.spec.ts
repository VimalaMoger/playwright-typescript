import { test, expect, chromium} from '@playwright/test';
import * as allure from "allure-js-commons";


test('Browser context', async ({  }) => {

    await allure.displayName("Browser context test");
    await allure.owner("Vmla");
    await allure.tags("Browser test", "Pages creation");
    await allure.severity("critical");

    const browser = await chromium.launch();
    const context = await browser.newContext();

    //creating 2 pages
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    
    await page1.goto('https://www.playwright.dev/');

    await page2.goto('https://www.selenium.dev/');
    await expect(page2).toHaveTitle('Selenium');

    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);
   
});