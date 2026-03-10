import { test as base } from '@playwright/test';
import { MainPage } from '../../pages/kayakapp/MainPage';

// Extend Base test by providing a "MainPage" fixture
const test = base.extend<{ mainPage: MainPage }>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
});

test("Kayak.com Date Picker Test Check-in and Check-out", async ({mainPage}) => {    
    await mainPage.navigateTo('https://www.kayak.com/');
 
    // click on the check-in date field 
    await mainPage.clickCheckInDate();

    // Check-in date user wants to select
    let checkinYear = 2026;
    let checkinMonth = 6; // june
    let checkinDay = 15;    
    let nextPage = true;

    await mainPage.select_year_month_day(checkinYear, checkinMonth, checkinDay, nextPage);
    // Select the specific day for check-in
    await mainPage.select_specific_day(checkinDay);
    
    // Check-out date user wants to select
    let checkoutYear = 2026;    
    let checkoutMonth = 10; 
    let checkoutDay = 20;

    await mainPage.select_year_month_day(checkoutYear, checkoutMonth, checkoutDay, nextPage);
    // Select the specific day for check-out
    await mainPage.select_specific_day(checkoutDay);
});