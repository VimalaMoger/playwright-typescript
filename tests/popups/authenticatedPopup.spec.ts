import {test, expect, chromium} from '@playwright/test';



test('authenticated popup test1', async ({browser}) => {

  // new context
  const context = await browser.newContext();

  //create a page
  const parentPage = await context.newPage();

  //Navigate to the page that triggers the authenticated popup
  await parentPage.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

  await parentPage.waitForLoadState();
  await expect(parentPage.locator('text=Congratulations! You must have the proper credentials.')).toBeVisible();
});

test('authenticated popup test2', async ({browser}) => {

  // new context
  const context = await browser.newContext({httpCredentials: {
    username: 'admin',
    password: 'admin'
  }});

  //create a page
  const parentPage = await context.newPage();

  //Navigate to the page that triggers the authenticated popup
  await parentPage.goto('https://the-internet.herokuapp.com/basic_auth');

  await parentPage.waitForLoadState();
  await expect(parentPage.locator('text=Congratulations! You must have the proper credentials.')).toBeVisible();
});


test.only('authenticated popup test3', async ({browser}) => {

  // new context
  const context = await browser.newContext();

  //create a page
  const parentPage = await context.newPage();

  //Navigate to popup
  await parentPage.goto('https://resplendent-pony-e08064.netlify.app/page3');
  parentPage.click('#loginBtn') // triggers popup  

  await parentPage.locator('#username').fill("admin");
  await parentPage.locator('#password').fill("1234");
  await parentPage.locator('#submitLogin').click();
 
  await parentPage.waitForTimeout(3000); 
});
