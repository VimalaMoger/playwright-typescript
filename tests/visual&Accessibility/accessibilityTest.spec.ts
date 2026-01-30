import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


test('Accessibility test for the main page', async ({page}, testInfo) => {
  // Navigate to the main page
  await page.goto('https://kaleidoscopic-cat-fc1c3c.netlify.app/');

  // Initialize AxeBuilder with the current page
  const axeBuilder = new AxeBuilder({page});

  // Analyze the page for accessibility issues- scanning to detect all types of WCAG violations
  //const results = await axeBuilder.analyze();

  //scanning for all WCAG 2.0 and WCAG 2.1 violations
  //const results = await axeBuilder.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

  //scanning for few WCAG voilations with disable rules
  const results = await axeBuilder.disableRules(['aria-required-children']).withTags(['wcag2a', 'wcag2aa']).analyze();

  //attach results to test info for reporting
  await testInfo.attach('accessibility-report', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });
    
  // Log the results to the console
  console.log(results);

  // Assert that there are no accessibility violations
  expect(results.violations).toEqual([]);     
});



