import {test} from '../../../fixtures/baseTest';
import {expect} from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

//test.describe.configure({ mode: 'parallel' });

// Read CSV data function - read data from csv file
const filePath = 'tests/dataDriven/csv/data.csv';

function readCSVData() : Array<Record<string, string>> {
  const fileContent = fs.readFileSync(filePath, 'utf-8');  
  return parse(fileContent, { columns: true, skip_empty_lines: true }); //Record<string, string>
}

// Iterate over each CSV record and create a test suite

for ( const csvData of readCSVData()) { 

    test.describe(`Grouping multiple tests ${csvData.firstName}`, {tag: ['@grouping','@regression']}, async () => {

        test.beforeEach('Register',async ({registerPage}) => {
            await registerPage.navigateTo('https://sweet-torte-0bf6bc.netlify.app/');
            await registerPage.assertElementVisible();
            await registerPage.clickRegisterLink();
            await registerPage.register(csvData.email, csvData.password, csvData.firstName);               
        });

        test('Login', {tag: ['@pageVisible', '@regression']}, async ({ registerPage, loginPage }) => {
            await registerPage.handleAlertDialog();              
            await loginPage.assertLoginDisplayTextVisible();
            await loginPage.login(csvData.email, csvData.firstName);
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