import {test, expect} from '@playwright/test';



test('authenticated popup test', async ({browser}) => {

  // new context
  const context = await browser.newContext();

  //create a page
  const parentPage = await context.newPage();
  //Navigate to the page that triggers the authenticated popup
  await parentPage.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');



  await parentPage.waitForLoadState();
  await expect(parentPage.locator('text=Congratulations! You must have the proper credentials.')).toBeVisible();


  });
