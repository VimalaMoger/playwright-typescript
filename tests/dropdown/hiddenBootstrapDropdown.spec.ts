import { test as base, Page as page } from '@playwright/test';
import { LoginPage } from '../../pages/opensource-demo/LoginPage';


// Extend Base test by providing a "LoginPage" fixture
const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

test("Bootstrap hidden Dropdown Test", async ({loginPage})=> {

    await loginPage.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await loginPage.login('Admin', 'admin123');

    //click on PIM module
    await loginPage.click();

    //click on Job Title Dropdown
    await loginPage.clickJobTitleDropdown();

    //capture all the options from dropdown and count   
    const options = await loginPage.getOptions();
    console.log("Total Options in Job Title Dropdown: " + options.count());

    // print options
    console.log("All the text contents: ", await options.allTextContents());

    //print all the options from dropdown
    for(let i = 0; i < await options.count(); i++) {
        const optionText = await options.nth(i).textContent();
        console.log(optionText);
    }  
    
    //select specific option from dropdown
    for(let i = 0; i < await options.count(); i++) {
        const optionText = await options.nth(i).textContent();  
        if(optionText?.trim() === 'Automation Tester') {
            await options.nth(i).click();
            break;
        }   
    }
});