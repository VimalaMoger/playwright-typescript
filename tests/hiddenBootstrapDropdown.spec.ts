import {test, expect, Locator} from '@playwright/test';

test("Bootstrap hidden Dropdown Test", async ({page})=> {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login to the application
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    //click on PIM module
    await page.getByText('PIM').click();

    //clci on Job Title Dropdown
    await page.locator('form i').nth(2).click();

    await page.waitForTimeout(3000);

    //capture all the options from dropdown and count
    const options: Locator = page.locator('div[role="listbox"] span');
    const optionCount = await options.count();
    console.log("Total Options in Job Title Dropdown: " + optionCount);

    // pring options
    console.log("All the text contents: ", await options.allTextContents());

    //print all the options from dropdown
    for(let i=0; i<optionCount; i++) {
        const optionText = await options.nth(i).textContent();
        console.log(optionText);
    }  
    
    //select specific option from dropdown
    for(let i=0; i<optionCount; i++) {
        const optionText = await options.nth(i).textContent();  
        if(optionText?.trim() === 'Automation Tester') {
            await options.nth(i).click();
            break;
        }   
    }
    await page.waitForTimeout(3000);
});