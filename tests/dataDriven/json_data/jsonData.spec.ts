import { expect } from '@playwright/test';
import {test} from '../../../fixtures/baseTest';
import fs from 'fs';


//test.describe.configure({ mode: 'parallel' });
//test.use({ actionTimeout: 10000 });

// Read data from JSON file
const loginData :any= JSON.parse(fs.readFileSync('./tests/dataDriven/json_data/data.json', 'utf-8'));

//for (const index of loginData || []) {  // Fallback to empty array if loginData is undefined or null

// check if loginData is an array
if (Array.isArray(loginData)) {    
    for (let [email, password, firstName] of loginData.map((item: {email: string, password: string, firstName: string}) => [item.email, item.password, item.firstName])) {
     

        test.describe(`Grouping multiple tests ${firstName}`, {tag: ['@grouping','@regression']}, async () => {
            test.beforeEach('Register',async ({registerPage}) => {           
                await registerPage.navigateTo('https://sweet-torte-0bf6bc.netlify.app/');
                await registerPage.assertElementVisible();
                await registerPage.clickRegisterLink();
                await registerPage.register(email, password, firstName);                                 
            });

            test('Login', {tag: ['@pageVisible', '@regression']}, async ({ loginPage }) => {
                await loginPage.handleAlertDialog();              
                await loginPage.assertLoginDisplayTextVisible();
                await loginPage.login(email, firstName);
            });

            test.skip('@browserTest @sanity Browser name test', async ({registerPage}) => {
                test.skip(await registerPage.getBrowserName() !== 'chromium', 'This test runs only on Chromium browsers');
                console.log('This test is running on Chromium browser');
            });

            test.fixme('Fixme test example', async () => {
                // This test is marked as 'fixme' and will be skipped                
            });
            
            //test('slow test example', async () => {
                //test.slow();
            //});

            test.fail('Intentional failure test', async ({registerPage}) => {
                await registerPage.assertElementVisible(); // This assertion will fail
            });

            test.afterEach('Verify Text Input Actions', async ({ itemsPage, confirmPage }) => {         
                // Verify text visible
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
}