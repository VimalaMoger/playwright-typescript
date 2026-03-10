import { test as base, expect, Locator } from '@playwright/test';
import { PageFour } from '../../pages/myjquerypage/PageFour';

const test = base.extend<{ pageFour: PageFour }>({
    pageFour: async ({ page }, use) => {
        const pageFour = new PageFour(page);
        await use(pageFour);
    },
});


test("should display correct number of entries per page", async ({ pageFour }) => {

    // Navigate to the page with pagination
    await pageFour.navigateTo('https://precious-scone-c844ed.netlify.app/page4'); 
    // repeat the same logic for multiple pages
    let nextPage = true;
    while (nextPage) {
        const rowsPerPage = await pageFour.getTableData();
        for (let row of rowsPerPage) {
            console.log(row + " ");
        }
        if (await pageFour.isNextButtonDisabled()) {
                nextPage = false;
        } else {
                await pageFour.clickNext();
        } 
    }
});

test("should navigate through pagination correctly", async ({ pageFour }) => {

    await pageFour.navigateTo('https://precious-scone-c844ed.netlify.app/');
    // Scrape the title
    const name = await pageFour.getName();
    console.log("Name:", name);
    expect(name).toBe('Your Name');
});

test("filter the rows and check the rows count", async ({ pageFour }) => {

    // Navigate to the page with pagination
    await pageFour.navigateTo('https://precious-scone-c844ed.netlify.app/page4');

    // Select the entries dropdown and choose 20 entries
    await pageFour.selectEntries('20');

    const rowsPerPage = await pageFour.getTableData();
    expect(rowsPerPage.length).toBeLessThanOrEqual(20);

});

test("search for specific data in a table", async ({ pageFour }) => {

    await pageFour.navigateTo('https://precious-scone-c844ed.netlify.app/page4');

    // search name 'Brat Steve' in the search box     
    await pageFour.searchForName('Brat Steve');

    // Verify that the table displays the correct results
    const rowsPerPage = await pageFour.getTableData();
    let matchFound = false;
    if (rowsPerPage.length > 0) {        
        for (let row of rowsPerPage) {
            console.log(row + " ");
            if (row.includes("Steve")) {
                matchFound = true;
                break;
            }
        }
        // Expect the match to be found
        expect(matchFound).toBeTruthy();      
    } else {
        console.log("No rows found after search");
    }
});