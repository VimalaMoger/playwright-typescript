import {test, expect} from '@playwright/test';

test('Popup page handling test', async ({browser}) => {

  // new context
  const context = await browser.newContext();

  // create a page
  const parentPage = await context.newPage();

  // Navigate to the page that triggers a popup
  await parentPage.goto('https://dapper-macaron-0392da.netlify.app/page2');

  // Listen for the popup event
  const [popupWindow] = await Promise.all([
    context.waitForEvent('page'),
    // Click the button that opens the popup
    parentPage.click('#viewImage')
  ]);

    // Wait for the popup to load content
    await popupWindow.waitForLoadState();

    // Verify the popup URL
    console.log("popup.url():", popupWindow.url());  

    // 
    expect(await parentPage.title()).toBe(await context.pages()[0].title());
    expect(await popupWindow.title()).toBe(await context.pages()[1].title());

    await popupWindow.waitForTimeout(3000); // Just to visually confirm during test run
    
});