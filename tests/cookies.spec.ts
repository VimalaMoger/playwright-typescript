import { test, expect, chromium } from '@playwright/test';




test('Browser cookies', async() => {
    
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page = await context.newPage();


    // Set a cookie in the browser context
    context.addCookies([
        {
            name: 'test_cookie',
            value: 'cooke_value_123',
            url: 'https://calm-praline-1cf337.netlify.app',
        }
    ]);

    
    await page.goto('https://calm-praline-1cf337.netlify.app');

    // Get the details of the cookie by name:
    const cookie = await context.cookies().then(cookies => cookies.find(c => c.name === 'test_cookie'));

    // Assert the cookie value
    expect(cookie?.value).toBe('cooke_value_123'); 

    //print the cookie details
    console.log('cookie details:', cookie);


    // Get all the cookies created by the browser
    console.log('All cookies:', (await context.cookies()).values());
    console.log('All cookies count:', (await context.cookies()).length);

    // clear all the cookies
    await context.clearCookies();
   
    console.log('All cookies count after clearing:', (await context.cookies()).length);

    expect((await context.cookies()).length).toBe(0);
    await page.waitForTimeout(2000); // Just to visually confirm the test

});