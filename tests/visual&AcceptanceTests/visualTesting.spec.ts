import {test, expect} from '@playwright/test';



test('Homepage visual comparision', async ({page}) => {
  await page.goto('https://teal-bienenstitch-6e2de9.netlify.app/');


    // Visual comparison
    expect(await page.screenshot()).toMatchSnapshot("homepage.png");

    //await expect(page).toHaveScreenshot();
});