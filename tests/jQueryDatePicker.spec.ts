import {test, expect, Locator} from '@playwright/test';
import { TIMEOUT } from 'dns';

// current date and month
test("JQuery DatePicker Test", async ({page}) => {

    await page.goto('https://dapper-macaron-0392da.netlify.app/page3');

    const datePicker : Locator = page.locator("#Test_Date");
    expect(datePicker).toBeVisible();

    await datePicker.click();

    await datePicker.fill("2025-11-25");

    await page.waitForTimeout(5000);
    expect(datePicker).toHaveValue("2025-11-25");
    const selectedDate = await page.locator("#selectedDate").textContent();
    expect(selectedDate).toBe("You selected the date: 2025-11-25");
});

test.only("Kayak.com Date Picker Test Check-in and Check-out", async ({page}) => {
    await page.goto('https://www.kayak.com/');
    await page.waitForTimeout(5000);
    let nextPage = true;
 
    // click on the check-in date field to open the date picker
    await page.locator("//span[@class='yx0f-placeholder'][text()='Departure']").click();

    // Check-in date user wants to select
    let checkinYear = 2026;
    let checkinMonth = 6; // june
    let checkinDay = 15;

    //  User wants to navigate to the correct month and year for check-in
    while (nextPage) {
        const monthYearText = await page.locator('.OV9e-tbl-wrapper caption').nth(0).innerText();  //nth(0)
        const [monthName, year] = monthYearText!.split(' '); //June 2026
        const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
        if (parseInt(year) === checkinYear && monthNumber === checkinMonth) {
            break;
        } else {
          const nextButton = page.locator("//div[@aria-label='Next Month']");
          const isDisabled = await nextButton.getAttribute('class');

          if (isDisabled?.includes('disabled')) {
              nextPage = false;
          } else {
              await nextButton.click();
              //await page.waitForTimeout(1000); // wait for the page to load
          }
        }
    }

    // Select the specific day for check-in
    let selectCheckinMonthDays = page.locator(".OV9e-tbl-wrapper div:nth-child(2) tbody").nth(0).locator('td').all();
    let checkinDaySelected = false;
    for (let day of await selectCheckinMonthDays) {
        const dayText = await day.innerText();
        if (dayText === checkinDay.toString()) {
          await day.click();
          checkinDaySelected = true;
          break;
        }
    }
    expect(checkinDaySelected).toBeTruthy();

    // Check-out date user wants to select
    let checkoutYear = 2026;    
    let checkoutMonth = 10; // November
    let checkoutDay = 20;

    // User wants to navigate to the correct month and year for check-out
    while (nextPage) {
        const monthYearText = await page.locator('.OV9e-tbl-wrapper caption').nth(1).innerText();  //nth(0)
        const [monthName, year] = monthYearText!.split(' '); //November 2026
        const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
        if (parseInt(year) === checkoutYear && monthNumber === checkoutMonth) {
            break;
        } else {
          const nextButton = page.locator("//div[@aria-label='Next Month']");
          const isDisabled = await nextButton.getAttribute('class');

          if (isDisabled?.includes('disabled')) {
              nextPage = false;
          } else {
              await nextButton.click();
          }
        }
    }

     // Select the specific day for check-out
    let selectCheckoutMonthDays = page.locator(".OV9e-tbl-wrapper div:nth-child(3) tbody").locator('td').all();
    let checkoutDaySelected = false;
    for (let day of await selectCheckoutMonthDays) {
        const dayText = await day.innerText();

        if (dayText === checkoutDay.toString()) {
          await day.click();
          checkoutDaySelected = true;
          break;
        }
    }
    expect(checkoutDaySelected).toBeTruthy();
    await page.waitForTimeout(5000);
});