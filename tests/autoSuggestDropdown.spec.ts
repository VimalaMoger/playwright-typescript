import {test, expect } from '@playwright/test';

test('Auto-suggest Dropdown Tests', async ({ page }) => {

  await page.goto('https://www.flipkart.com/');
  

  await page.locator("//input[@name='q']").fill('iphone');  //search text

  
  //autowaiting feature of playwright
  await page.waitForTimeout(5000); //wait for 2 seconds to see the suggestions

  // get all the suggested options --> cntl+shift+p on DOM -- emulate focused page

  const getAllSuggestedOptions = page.locator('ul>li'); //suggested options locator
  const count = await getAllSuggestedOptions.count(); //count of suggested options
  console.log('Total suggested options: ' + count);

  //print all using map
  const optionsText: string[] = await (await getAllSuggestedOptions.allTextContents()).map(text => text.trim());
  console.log('Suggested options using map: ', optionsText);

  //print all suggested options using loop
  for (let i = 0; i < count; i++) {
    const optionText = await getAllSuggestedOptions.nth(i).textContent();
    console.log(optionText);
  } 

  // dynamically select and click on specific option
  for (let i = 0; i < count; i++) {
    const optionText = await getAllSuggestedOptions.nth(i).textContent();   
    if (optionText?.trim() === 'iphone 15 pro plus') {
      await getAllSuggestedOptions.nth(i).click();
      break;
    }
  }
  
});

