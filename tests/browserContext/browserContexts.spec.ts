import {test, expect, chromium} from '@playwright/test';


test("Browser settings", async() => {

    const browser = await chromium.launch({headless:true});

    const context = await browser.newContext(
        {
            viewport: {width:1200, height:800},
            locale:'en-US',
            ignoreHTTPSErrors:true
            // proxy: { server: 'http://myproxy.com:3128', username: 'usr', password: 'pwd' }
        }
    );

    const pageOne = await context.newPage();

    await pageOne.goto('https://expired.badssl.com/');
    console.log("title of the page :", await pageOne.title());

    await pageOne.waitForTimeout(5000);

});