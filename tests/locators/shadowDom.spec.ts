import {test as base,expect} from '@playwright/test';
import { MainPage } from '../../pages/books-pwakit/MainPage';
import { LandingPage } from '../../pages/shop.polymer/LandingPage';


const test = base.extend<{ mainPage: MainPage, landingPage: LandingPage }>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
    landingPage: async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    },
});

test('Shadow Dom', async({ mainPage }) => {
    await mainPage.navigateTo('https://books-pwakit.appspot.com/');
    await mainPage.performSearch("Playwright automation"); 
    expect(await mainPage.getBookLength()).toBe(5);
});


test('Nested Shadow Dom', async({ landingPage }) => {
    await landingPage.navigateTo('https://shop.polymer-project.org/');
    await landingPage.click();
    expect(await landingPage.getProductLength()).toBe(16);
});