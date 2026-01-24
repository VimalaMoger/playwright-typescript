import { test, expect } from '@playwright/test';


test('Playwright assertions test', async ({ page }) => {


    await page.goto('https://calm-praline-1cf337.netlify.app/');

    
    //Auto retry assertions

    const title = page.locator('#heading1');
    await expect(title).toBeVisible();
    expect(title.textContent()).not.toBeNull();

    
    await expect(title).toHaveText('My First jQuery Web Page', { timeout: 5000 });
    expect(title).toContainText('Web Page');

    const button = page.locator('#drag');
    await expect(button).toBeEnabled();
    
    //Non-retry assertions
    const titleText = await title.textContent();
    expect(titleText?.includes('jQuery')).toBeTruthy();

    const buttonText = await button.textContent();
    expect(buttonText).toBe('Click to Drag');

    // Negative assertion - auto retry
    await expect(page.locator('.stop')).not.toBeEnabled();
    // Negative assertion - non-retry
    const isDisabled = await page.locator('.stop').isEnabled();
    expect(isDisabled).toBeFalsy();
    expect(buttonText).not.toBe('Submit');
    expect(titleText?.includes('React')).toBeFalsy();
    
});

test.only("Autowaiting and forcing", async ({ page }) => {
    await page.goto('https://calm-praline-1cf337.netlify.app/');

    const title =  page.locator('#heading1');

    // Hard assertion - test fails
    await expect.soft(title).toHaveText('Unknown Title');

    // Soft assertion 
    await expect.soft(title).toHaveText('Unknown Title');
    console.log('Hard assertion passed');
    
    await expect.soft(title).not.toBeVisible();

    console.log('Soft assertion executed');

    await page.waitForTimeout(2000); 
      
});