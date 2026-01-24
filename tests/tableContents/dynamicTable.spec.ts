import { test, expect, Locator } from '@playwright/test';


test("Verify Chrome CPU load in dynamic table", async ({ page }) => {

    await page.goto("http://practice.expandtesting.com/dynamic-table");

    // locate the table body
    const table:Locator = page.locator("table.table tbody");

    await expect(table).toBeVisible();
    
    // get all rows in the table
    const rows: Locator[]= await table.locator("tr").all();

    // expect there are 4 rows
    expect(rows).toHaveLength(4);

    let cpuLoad: string | undefined;

    // first column has browser names
    // ensure we found the Chrome row and got its CPU load

    for (const row of rows) {
        const name: string = await row.locator("td").nth(0).innerText();
        if (name === "Chrome") {
            cpuLoad = await row.locator("td", { hasText: '%' }).innerText();
            console.log(`CPU Load for Chrome is: ${cpuLoad}`);
            break;
        }
    }
    
    if (!cpuLoad) {
        throw new Error("Chrome row not found or CPU load not available");
    }

    // now compare with the value displayed elsewhere on the page
    let compareWithValue: string = await page.locator("#chrome-cpu").innerText();
    console.log(`Value to compare with is: ${compareWithValue}`);

    // check if the compareWithValue contains the cpuLoad
    if (compareWithValue.includes(cpuLoad)) {
        console.log("The value to compare with contains the name Chrome");
    } else {
        console.log("The value to compare with does not contain the name Chrome");
    }
});