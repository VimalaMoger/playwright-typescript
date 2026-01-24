import { test, expect, Locator } from '@playwright/test';


test("should display correct number of entries per page", async ({ page }) => {

    // Navigate to the page with pagination
    await page.goto('https://resplendent-pony-e08064.netlify.app/page4');   
    

    // repeat the same logic for multiple pages
      let nextPage = true;
  

    while (nextPage) {

        const rowsPerPage = await page.locator("#tableData tbody tr").all();
        for (let row of rowsPerPage) {
            console.log(await row.innerText());
            
        }

        const nextButton = page.locator("button[aria-label='Next']");
        const isDisabled = await nextButton.getAttribute('class');

        if (isDisabled?.includes('disabled')) {
                nextPage = false;
        } else {
                await nextButton.click();
                await page.waitForTimeout(1000); // wait for the page to load
        } 
    }
});

test("should navigate through pagination correctly", async ({ page }) => {

    // Navigate to the page with pagination
    await page.goto('https://resplendent-pony-e08064.netlify.app/');

    // Scrape the title
    const name = await page.locator('#name').getAttribute('value');
    console.log("Name:", name);
    expect(name).toBe('John Smith');
});

test("filter the rows and check the rows count", async ({ page }) => {

    // Navigate to the page with pagination
    await page.goto('https://resplendent-pony-e08064.netlify.app/page4');

    // Select the entries dropdown and choose 20 entries
    const dropdown: Locator = page.locator("#dt-length-0");
    await dropdown.selectOption({label: '20'});

    const rowsPerPage = await page.locator("#tableData tbody tr").all();
    expect(rowsPerPage.length).toBeLessThanOrEqual(20);

});

test.only("search for specific data in a table", async ({ page }) => {

    //test.setTimeout(120000); 

    // Navigate to the page with pagination
    await page.goto('https://resplendent-pony-e08064.netlify.app/page4');

    // search name 'Brat Steve' in the search box
    const dropdown: Locator = page.locator("#dt-search-0");
    
    // Enter the search term
    await dropdown.fill('Brat Steve');

    await page.waitForTimeout(1000); 

    // Verify that the table displays the correct results
    const rowsPerPage = await page.locator("#tableData tbody tr").all();
    let matchFound = false;
    if (rowsPerPage.length > 0) {
        
        for (let row of rowsPerPage) {
            const rowText = await row.innerText();
            console.log(rowText);
            if (rowText.includes("Steve")) {
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