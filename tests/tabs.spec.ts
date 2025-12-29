import {test, expect, chromium} from '@playwright/test';


test('Handle tabs', async ({}) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();

    // parent page
    const parentPage = await context.newPage();


    parentPage.goto('https://www.playwright.dev/');   

    // child Tab 
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        parentPage.click('a[target="_blank"]'), // Click on link that opens a new tab
    ]);

    console.log('number of pages created: ', context.pages().length); // should be 2

    // Wait for the new tab to load content
    await newTab.waitForLoadState();

    console.log('Title of the new tab: ', await newTab.title());
    console.log('Title of the parent page: ', await parentPage.title());

    // 
    expect(await parentPage.title()).toBe(await context.pages()[0].title());
    expect(await newTab.title()).toBe(await context.pages()[1].title());

});