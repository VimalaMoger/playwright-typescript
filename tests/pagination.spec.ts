import { test, expect, Locator } from '@playwright/test';

test("should navigate through pagination correctly", async ({ page }) => {
  // Navigate to the page with pagination
  await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

  let nextPage = true;
  

  while (nextPage) {
    const rowsPerPage = await page.locator("#example tbody tr").all();
    for (let row of rowsPerPage) {
        console.log(await row.innerText());
    }
    // repeat the same logic for multiple pages
    const nextButton =page.locator('button[aria-label="Next"]');
    const isDisabled= await nextButton.getAttribute('class');

    if (isDisabled && isDisabled.includes('disabled')) {
            nextPage = false;
    } else {
            await nextButton.click();
            await page.waitForTimeout(1000); // wait for the page to load
    }
  }
});

test("filter the rows and check the rows count", async ({ page }) => {

  // Navigate to the page with pagination
  await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

  // Select the entries dropdown and choose 25 entries
    const dropdown: Locator = page.locator("#dt-length-0");
    await dropdown.selectOption({label: '25'});

    const rowsPerPage = await page.locator("#example tbody tr").all();
    expect(rowsPerPage.length).toBeLessThanOrEqual(25);

});

test.only("search for specific data in a table", async ({ page }) => {

  // Navigate to the page with pagination
  await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

  // search name 'Ashton Cox' in the search box
    const dropdown: Locator = page.locator("#dt-search-0");
    
    // Enter the search term
    await dropdown.fill('Ashton Cox');

    await page.waitForTimeout(1000); 

    // Verify that the table displays the correct results
    const rowsPerPage = await page.locator("#example tbody tr").all();
    if (rowsPerPage.length > 0) {
        let matchFound = false;
        for (let row of rowsPerPage) {
            const rowText = await row.innerText();
            if (rowText.includes('Ashton Cox')) {
                matchFound = true;
                break;
            }
        }
        // Expect the match to be found
        expect(matchFound).toBeTruthy();
        //expect(matchFound).toBeFalsy();
        
    } else {
        console.log("No rows found after search");
    }

});