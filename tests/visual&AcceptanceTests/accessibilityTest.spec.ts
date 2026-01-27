import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


test('Accessibility test for the main page', async ({page}) => {
  // Navigate to the main page
  await page.goto('https://bucolic-cucurucho-c51ed2.netlify.app/');

  // Initialize AxeBuilder with the current page
  const axeBuilder = new AxeBuilder({page});

    // Analyze the page for accessibility issues
    const results = await axeBuilder.analyze();
    
    // Log the results to the console
    console.log(results);

    // Assert that there are no accessibility violations
    expect(results.violations).toEqual([]);     
});



