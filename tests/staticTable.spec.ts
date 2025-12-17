import { test, expect, Locator } from 'playwright/test'

test('Static Table Tests', async ({ page }) => {


    await page.goto('https://glowing-scone-599a90.netlify.app/')

    const tableRows: Locator = page.locator('table[id="rules"] tbody');
    await expect(tableRows).toBeVisible();
    await expect(tableRows).toHaveCount(1);

    // count number of rows in the table
    const rowCount = await tableRows.locator('tr').count();
    expect(rowCount).toBe(2);

    // Validate content of the table headers
    const tableHeaders: Locator = page.locator('table[id="rules"] thead tr th');
    await expect(tableHeaders.nth(0)).toHaveText('Person');
    await expect(tableHeaders.nth(1)).toHaveText('Most interest in');

    // Read individual data from first row
    const firstRowCells: Locator = tableRows.locator('tr').nth(0).locator('td');
    await expect(firstRowCells.nth(0)).toHaveText('Sarah');
    await expect(firstRowCells.nth(1)).toHaveText('Web accessibility');

    // Get all data from first row
    const rowData: string[] = await firstRowCells.allTextContents();
    console.log('Data in second row:', rowData);
    expect(rowData).toEqual(['Sarah', 'Web accessibility']);

    // Read all data excluding header

    const allRows = await tableRows.locator('tr').all();

    for (let row of allRows) {
        const eachRowValues: string[] = await row.locator('td').allInnerTexts();
        console.log(`Row data:`, eachRowValues.join('\t'));
    }   

    // Print person who is interested in "Web accessibility"
    //store in a an array and assert
    const interestedPersons: string[] = [];

    for (let row of allRows) {
        const cells: string[] = await row.locator('td').allInnerTexts();
        const person =  cells[0];
        const interest =  cells[1];
        console.log(`${person} is interested in ${interest}`);
        interestedPersons.push(person);
        if (interest === 'Web accessibility') {
            console.log(`Person interested in Web accessibility: ${person}`);
            expect(person).toBe('Sarah');
        }
    }

    console.log('All persons interested in topics:', interestedPersons);
    expect(interestedPersons).toEqual(['Sarah', 'David']);
    expect(interestedPersons.length).toBe(2);

    // assert average age
    const tableFooter: Locator = page.locator('table[id="rules"] tfoot tr');
    // Get all data from footer row
    const tFooterRow: string[] = await tableFooter.allInnerTexts();
    // replace tabs with comma
    console.log('Data in the row:', tFooterRow.map(item => item.replace(/\t/g, ', ')));
    const dataWithoutTabs = tFooterRow.map(item => item.replace(/\t/g, ', '))
    expect(dataWithoutTabs).toEqual(["Average age, 33"]);

});