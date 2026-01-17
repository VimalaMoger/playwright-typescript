import {test, expect} from '@playwright/test';



test('Homepage visual regression', async ({page}) => {
  await page.goto('https://calm-praline-1cf337.netlify.app/');

  //page screenshot
  await page.screenshot({path: 'screenshots/' + `homepage_${Date.now()}.png`, fullPage: true});

  // Element screenshot
  const header =  page.locator('h1');
  await header.screenshot({path: 'screenshots/' + `header_${Date.now()}.png`});
});