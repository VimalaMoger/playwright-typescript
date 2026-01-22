import {test, expect, Locator, Page} from '@playwright/test';

import * as XLSX from 'xlsx';

/* 
  This test script verifies the text input actions on a sample web application.
            // https://sweet-torte-0bf6bc.netlify.app/  // Sample web app URL
  It performs the following actions:
  1. Navigates to the registration page.  
  2. Fills out the registration form with sample data.
  3. Submits the registration form and handles the alert dialog.
  4. Verifies that the login page is displayed after registration.
  5. Fills out the login form with the registered data.
  6. Submits the login form.
  7. Verifies that the items(resource) page is displayed after login.
  8. Checks the length of the heading text on the items page.
  9. Radio button and checkbox actions 
  10. Handles multiple alert dialogs and verifies their messages.
*/

//test.describe.configure({ mode: 'parallel' });
let page: Page;

// Read excel data function
const filePath = 'tests/dataDriven/excel/excel.xlsx';

function readExcelData() : { email: string, password: string, firstName: string }[] {
  const fileContent = XLSX.readFile(filePath, { cellDates: true });
  const sheetName = fileContent.SheetNames[0];
  const worksheet = fileContent.Sheets[sheetName];

  // convert worksheet into json
  return XLSX.utils.sheet_to_json(worksheet);
}

// Iterate over each json data and create a test suite
for (const data of readExcelData() || []) { 
    
    test.beforeAll('Register',async ({browser}) => {
        page = await browser.newPage();

        // Navigate to url
        await page.goto('https://sweet-torte-0bf6bc.netlify.app/');
        
        // Verify register button clickable
        const registerButtonClick:Locator = page.getByRole('link', {name: 'Register' });
        await expect(registerButtonClick).toBeVisible(); 
        await registerButtonClick.click();

        // Verify register page successfully loaded and entered data

        await page.locator('#email').fill(data.email); // first column header(email) from excel

        await page.locator('input[type="password"]').fill(data.password);

        await page.locator('#fName').fill(data.firstName);  
        await page.locator('input[type="submit"]').click();        
    });

    test.describe(`Grouping multiple tests ${data.firstName}`, {tag: ['@grouping','@regression']}, async () => {

        test('Login', async () => {
            const loginText:Locator = page.getByRole("heading", { name: 'Please sign in' }); //getByRole
            await expect(loginText).toBeVisible({timeout:50000});

            // Verify login page successfully loaded and entered data
            const name = page.locator('#fName');
            await name.fill(data.firstName);
            // grab first name 
            const enteredFirstName : string =  await name.inputValue();
            expect(enteredFirstName).toBe(data.firstName);

            await page.locator('#email').fill(data.email);

            // grab email
            const enteredEmail : string = await page.locator('#email').inputValue();
            expect(enteredEmail).toBe(data.email);
            await page.getByRole('button', { name: 'Login' }).click({timeout: 90000});
        });

        test('Items page', {tag: ['@pageVisible', '@regression']}, async () => {
            await page.goto('https://sweet-torte-0bf6bc.netlify.app/foodarpages/displayitems');
            const headingText:Locator = page.getByRole("heading", { name: 'Delicious Food Service' }); //getByRole
            await expect(headingText).toBeVisible();
        });

        test.skip('@browserTest @sanity Browser name test', async ({browserName}) => {
            test.skip(browserName !== 'chromium', 'This test runs only on Chromium browsers');
            // Test logic specific to Chromium browsers
            console.log('This test is running on Chromium browser');
        });

        //fixme the test
        test.fixme('Fixme test example', async () => {
            // This test is marked as 'fixme' and will be skipped
            // until the underlying issue is resolved.
            // Test logic goes here
        });
          // slow test
        test('slow test example', async () => {
            test.slow();
        });

        //fail the test
        test.fail('Intentional failure test', async ({browser}) => {
            // new context
        const context = await browser.newContext();
        // create a page
        const parentPage = await context.newPage();
            expect(context.pages()[0]).toBe(5); // This assertion will fail
        });
    });

    test.afterAll('Verify User selection and calculate the total', async () => { 
        
        // Verify resource(items) page displayed after login
        const headingText:Locator = page.getByRole("heading", { name: 'Delicious Food Service' }); //getByRole
        await expect(headingText).toBeVisible();

        // Verify length of heading text
        const maxLength = (await headingText.textContent())?.length;
        expect(maxLength).toBe(22);
        
        // capture all the checkboxes
        const checkboxes :Locator[]= await page.locator('input[type="checkbox"]').all();
        let total : number = 0;

        const priceArr  = await Promise.all(checkboxes.map(async (checkbox, index) => {
            await checkbox.check({ force: true });
            return await page.locator(`//tr[${index+1}]/td[3]`).textContent();
        }));
        
        const totalItemPrice : number = priceArr.reduce((acc, price) => acc + parseFloat(price!), 0);
        expect(totalItemPrice.toFixed(2)).toBe('85.91');
        
        // Checkbox actions - check the checkbox - single checkbox
        await page.locator("//input[@name='Oven_Baked_Pastas']").check();

        // assert the checkbox is checked
        expect(page.locator("//input[@name='Oven_Baked_Pastas']")).toBeChecked();
        
        const itemPrice : string | null = await page.locator("tr:nth-child(1) td:nth-child(3)").textContent();
        expect(itemPrice).toBe('12.99');

        // Add to cart button click
        await page.getByRole('button', { name: 'Add to Cart' }).click();

        // Radio button 
        expect(page.locator('//input[@value=3]')).toBeChecked();
        const treatValue : string | null = await page.locator("//input[@value=3]").getAttribute('value');
        expect(treatValue).toBe('3');

        await page.locator("//input[@id='num']").click();

        //  Check the checkbox again to avoid alert, since both options are now selected 
        await page.locator("//input[@value=0.10]").check();

        const tipValue : string | null = await page.locator('input[value="0.10"]').getAttribute('value');
        expect(tipValue).toBe('0.10');

        const totalTip : number = parseFloat(treatValue!) + parseFloat(tipValue!) * parseFloat(treatValue!);
        expect(totalTip).toBe(3.3);

        await page.locator("//input[@id='num']").click();
        await page.waitForTimeout(3000);
        
        const headingTextt:Locator = page.getByRole("heading", { name: 'Delicious Food Service' }); //getByRole
        await expect(headingTextt).toBeVisible();
        
    });
}