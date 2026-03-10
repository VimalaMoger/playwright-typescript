import { test as base, Page as page } from '@playwright/test';
import { LandingPage } from '../../pages/flipkart/LandingPage';



// Extend Base test by providing a "LandingPage" fixture
const test = base.extend<{ landingPage: LandingPage }>({
    landingPage: async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    },
});

test('Auto-suggest Dropdown Tests', async ({ landingPage }) => {
    await landingPage.navigateTo('https://www.flipkart.com/');
    await landingPage.clickPopup();
    await landingPage.clickSearchBox();
    await landingPage.fillSearchBox('iphone');  //search text

    //capture all the options from dropdown and count   
    const options = await landingPage.getOptions();
    console.log("Total suggestedOptions: " + options.count());

    // print options
    console.log("All the text contents: ", await options.allTextContents());

    //print all the options from dropdown
    for (let i = 0; i < await options.count(); i++) {
        const optionText = await options.nth(i).textContent();
        console.log(optionText);
    }

    //select specific option from dropdown
    for(let i = 0; i < await options.count(); i++) {
        const optionText = await options.nth(i).textContent();  
        if (optionText?.trim() === 'iphone 15 plus') {
            await options.nth(i).click();
            break;
        }   
    }
});

