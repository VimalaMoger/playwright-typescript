import { expect } from '@playwright/test';
import {test} from '../../../fixtures/baseTest';

import * as XLSX from 'xlsx';

//test.describe.configure({ mode: 'parallel' });

// Read excel data function
const filePath = 'tests/dataDriven/excel/excel.xlsx';

function readExcelData() : { email: string, password: string, firstName: string }[] {
  const fileContent = XLSX.readFile(filePath, { cellDates: true });
  const sheetName = fileContent.SheetNames[0];
  const worksheet = fileContent.Sheets[sheetName];

  // convert worksheet into json
  return XLSX.utils.sheet_to_json(worksheet);  //returns array of json objects
}

// Iterate over each json data and create a test suite
for (const data of readExcelData() || []) { 

    test.describe(`Grouping multiple tests ${data.firstName}`, {tag: ['@grouping','@regression']}, async () => {
        
        test.beforeEach('Register',async ({registerPage}) => {            
            await registerPage.navigateTo('https://sweet-torte-0bf6bc.netlify.app/');
            await registerPage.assertElementVisible();
            await registerPage.clickRegisterLink();
            await registerPage.register(data.email, data.password, data.firstName);        
        });

        test('Login', {tag: ['@pageVisible', '@regression']}, async ({ registerPage, loginPage }) => {
            await registerPage.handleAlertDialog();              
            await loginPage.assertLoginDisplayTextVisible();
            await loginPage.login(data.email, data.firstName);
        });

        test.skip('@browserTest @sanity Browser name test', async ({loginPage}) => {
            test.skip(await loginPage.getBrowserName() !== 'chromium', 'This test runs only on Chromium browsers');
            console.log('This test is running on Chromium browser');
        });

        //fixme the test
        test.fixme('Fixme test example', async () => {
            // This test is marked as 'fixme' and will be skipped
        });
            
        //test('slow test example', async () => {
            //test.slow();
        //});
            
        test.fail('Intentional failure test', async ({registerPage}) => {
            await registerPage.assertElementVisible(); 
        });

        test.afterEach('Verify Text Input Actions', async ({ itemsPage, confirmPage }) => {         
            // Verify display text
            await itemsPage.assertElementVisible(); 
            // Verify length of the text
            const maxLength = await itemsPage.getHeadingTextLength();  
            expect(maxLength).toBe(22);

            const priceArr : number[] = await itemsPage.selectAllCheckboxesAndGetPrices();
                        
            const totalItemPrice : number = priceArr.reduce((acc, price) => acc + price, 0);
            expect(totalItemPrice.toFixed(2)).toBe('85.91');

            await itemsPage.clickCartButton();

            // Radio button 
            const treatValue : number | null = await confirmPage.selectRadioButtonAndGetValue(3);
            expect(treatValue).toBe(3);

            await confirmPage.clickRequestButton();

            //  Select Tip radio button to avoid alert 
            const tipValue : number | null = await confirmPage.selectTipRadioButtonAndGetValue(0.10); 
            expect(tipValue).toBe(0.10);

            const totalTip : number = treatValue + tipValue * treatValue;
            expect(totalTip).toBe(3.3);

            await confirmPage.clickRequestButton();
                        
            await itemsPage.assertElementVisible(); 
        });    
    });
}