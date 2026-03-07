import { test as base } from '@playwright/test';
import { PageThree } from '../../pages/myjquerypage/PageThree';


// Extend basic test by providing a "PageOne" fixture
const test = base.extend<{ pageThree: PageThree }>({
    pageThree: async ({ page }, use) => {
        const pageThree = new PageThree(page);
        await use(pageThree);
    },
});

test.only("JQuery DatePicker Test", async ({pageThree}) => {

    await pageThree.navigateTo('https://resplendent-pony-e08064.netlify.app/page3');

    await pageThree.assertElementVisible();

    await pageThree.clickDatePicker();

    await pageThree.enterDateValue("2025-11-25");

    //await pageThree.verifyInputValues("2025-11-25");
    await pageThree.verifyTextContent("You selected the date: 2025-11-25");
});

