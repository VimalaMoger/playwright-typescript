import {test, expect} from '@playwright/test';


test('Mouse Actions Test', async ({page}) => {

  // Navigate to the test page
  await page.goto('https://resplendent-pony-e08064.netlify.app/page2');

  const hoverText = page.locator('#hoverBox').hover();
  console.log('Hover action performed on #hoverBox');
  // Wait for the hover action to complete
  await hoverText;

  // Locate the hover content element
  const getHoverContent = page.locator('#hoverBox');

  // Verify that the hover content is displayed
  await getHoverContent.waitFor({ state: 'visible' });
  const hoverContentText = await getHoverContent.textContent();
  expect(hoverContentText).toContain('Mouse is here!');
  console.log('Hover content verified:', hoverContentText);
  
});

test('Right click Action Test', async ({page}) => {
  
  // Navigate to the test page
  await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

  const button = page.locator('span.context-menu-one');

  //perform right click action
  await button.click({button:'right'});
  await page.waitForTimeout(5000);

});

test('Double click Actions Test', async ({page}) => {

  // Navigate to the test page
  await page.goto('https://resplendent-pony-e08064.netlify.app/page3');

  await page.locator('#field1').fill('Hello World');
  page.locator('#copyText').dblclick();
  await page.waitForTimeout(5000);
  const getField2Text = page.locator('#field2');
  expect(await getField2Text.inputValue()).toBe('Hello World');
  console.log('Double click action performed and text copied successfully');
});

test('Drag and Drop Action Test', async ({page}) => {

  // Navigate to the test page
  await page.goto('https://resplendent-pony-e08064.netlify.app/');
  
  const source = page.locator('#drag');
  const tgt = page.locator('#name');


  // Get the element's bounding box (position and size)
  const box = await source.boundingBox();

  // Ensure the element is found
  if (!box) {
    throw new Error('Element not found or not visible.');
    return; 
  }

  // Move to the center of the source element
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;

  // Target corodinates
  const targetX = 10;
  const targetY = 15;
  
  // Perform drag using mouse API
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(targetX, targetY);
  await page.mouse.up();

  //wait to perform action
  await page.waitForTimeout(5000);
  
});

test('Drag and Drop Actions Test', async ({page}) => {

  // Navigate to the test page
  await page.goto('https://resplendent-pony-e08064.netlify.app/');

  const source = page.locator('#drag');
  const tgt = page.locator('#name');

  //moucse hover to source element
  await source.hover();
  //mouse down at source element
  await page.mouse.down();
  //move mouse to target location
  await tgt.hover();
  //mouse up at target location
  await page.mouse.up();
  await page.waitForTimeout(5000);
});

test.only('Drag to target', async ({page}) => {

  // Navigate to the test page
  await page.goto('https://resplendent-pony-e08064.netlify.app/');

  const source = page.locator('#drag');
  const tgt = page.locator('#accordion');

  await source.dragTo(tgt);
  await page.waitForTimeout(5000);
});